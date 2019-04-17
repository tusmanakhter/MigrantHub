using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ML;
using Microsoft.ML.Trainers;
using Google.Apis.Storage.v1;
using Google.Cloud.Storage.V1;
using Microsoft.ML.Data;

namespace Service_Rating_Model.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class ModelController : ControllerBase
        {
            // GET api/model
            [HttpGet]
            public ActionResult<IEnumerable<string>> Get()
            {
                string TrainingDataLocation = "./ratings_train.csv";
                string TestDataLocation = "./ratings_test.csv";
                string DataLocation = "./ratings.csv";
                string ModelPath = "./model.zip";
                string bucketPath = "data_model_files";

                //set up the access to the google storage bucket
                string googleKeyPath = @"./key.json";
                System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", googleKeyPath);

                //download the latest ratings files from the google bucket and store them locally for temp use
                var storage = StorageClient.Create();
                using (var outputFile = System.IO.File.OpenWrite(DataLocation))
                {
                    storage.DownloadObject(bucketPath, "ratings.csv", outputFile);
                }

                //transforms the data using binary classification and splits the ratings.csv into ratings_train.csv and ratings_test.csv.
                dataprep();

                //set up the ML environment and create the "reader" by defining the way it should read from the dataset files
                MLContext mlContext = new MLContext();

                //read the training data and test data which will be used to train and test the service recommendation model
                var trainingDataView = mlContext.Data.LoadFromTextFile<ServiceRating>(path: TrainingDataLocation, hasHeader: false, separatorChar: ';');
                trainingDataView = mlContext.Data.Cache(trainingDataView);

                //transform the data by encoding the two features (userId, serviceID) to later provide them as input to the learner
                var pipeline = mlContext.Transforms.Text.FeaturizeText(outputColumnName: "userIdFeaturized", inputColumnName: nameof(ServiceRating.userId))
                                                    .Append(mlContext.Transforms.Text.FeaturizeText(outputColumnName: "serviceIdFeaturized", inputColumnName: nameof(ServiceRating.serviceId))
                                                    .Append(mlContext.Transforms.Text.FeaturizeText(outputColumnName: "userAgeFeaturized", inputColumnName: nameof(ServiceRating.userAge))
                                                    .Append(mlContext.Transforms.Concatenate("Features", "userIdFeaturized", "serviceIdFeaturized", "userAgeFeaturized"))
                                                    .Append(mlContext.BinaryClassification.Trainers.FieldAwareFactorizationMachine(new string[] { "Features" }))));

                //train the model by fitting it with our dataset then save the model to disk (locally and temporarily)
                var model = pipeline.Fit(trainingDataView);

                mlContext.Model.Save(model, trainingDataView.Schema, ModelPath);

                //upload the latest model from the local temp path and store it in the google bucket for later use
                using (var inputFile = System.IO.File.OpenRead("./model.zip"))
                {
                    storage.UploadObject(bucketPath, "model.zip", null, inputFile);
                }

                //method should clean up after itself by deleting all the temp files
                if (System.IO.File.Exists(TrainingDataLocation)) System.IO.File.Delete(TrainingDataLocation);
                if (System.IO.File.Exists(TestDataLocation)) System.IO.File.Delete(TestDataLocation);
                if (System.IO.File.Exists(ModelPath)) System.IO.File.Delete(ModelPath);

                return new string[] { "Successfully grabbed the latest ratings and exported their data model to the GCP Storage Bucket " + bucketPath + "! :)" };
            }

            // the problem needs to be set up as a binary classification problem. So this method:
            // - goes through all the ratings and replaces the ratings > 3 with 1 (recommended), and ratings < 3 as 0 (not recommended)
            // - splits the ratings.csv into rating_train.csv and ratings_test.csv used for model training and testing
            public static void dataprep()
            {
                string[] dataset = System.IO.File.ReadAllLines("./ratings.csv");
            
                string[] new_dataset = new string[dataset.Length];
                for (var i = 0; i < dataset.Length; i++)
                {
                    var line = dataset[i];
                    var lineSplit = line.Split(';');
                    var rating = Double.Parse(lineSplit[3]);

                    rating = rating > 3 ? 1 : 0;
                    lineSplit[3] = rating.ToString();

                    var new_line = string.Join(';', lineSplit);

                    new_dataset[i] = new_line;
                }

                dataset = new_dataset;

                var numLines = dataset.Length;
                var body = dataset.Skip(1);
                var sorted = body.Select(line => new { SortKey = Int32.Parse(line.Split(';')[4]), Line = line })
                                 .OrderBy(x => x.SortKey)
                                 .Select(x => x.Line);

                System.IO.File.WriteAllLines("./ratings_train.csv", dataset.Take(1).Concat(sorted.Take((int)(numLines * 0.9))));
                System.IO.File.WriteAllLines("./ratings_test.csv", dataset.Take(1).Concat(sorted.TakeLast((int)(numLines * 0.1))));

                //method should clean up after itself
                if (System.IO.File.Exists("./ratings.csv")) System.IO.File.Delete("./ratings.csv");
            }

        }

        public class ServiceRating
        {
            [LoadColumn(0)]
            public string userId;

            [LoadColumn(1)]
            public string serviceId;

            [LoadColumn(2)]
            public string userAge;

            [LoadColumn(3)]
            public bool Label;
        }
    }
