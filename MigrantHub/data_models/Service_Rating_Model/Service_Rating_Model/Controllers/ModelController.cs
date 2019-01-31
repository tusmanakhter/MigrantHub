using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ML.Runtime.Learners;
using Microsoft.ML.Runtime;
using Microsoft.ML.Runtime.Data;
using Microsoft.ML.Core.Data;
using Microsoft.ML.Runtime.Training;
using Microsoft.ML;
using Microsoft.ML.StaticPipe;
using Microsoft.ML.Trainers;
using static Microsoft.ML.Core.Data.SchemaShape;
using Microsoft.ML.Runtime.Api;
using Google.Apis.Storage.v1;
using Google.Cloud.Storage.V1;

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
            string TrainingDataLocation = @"./Data/ratings_train.csv";
            string TestDataLocation = @"./Data/ratings_test.csv";
            string ModelPath = @"./Model/model.zip";
            string bucketPath = "data_model_files";

            //set up the access to the google storage bucket
            string googleKeyPath = @"./key.json";
            System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", googleKeyPath);

            //download the latest ratings files from the google bucket and store them locally for temp use
            var storage = StorageClient.Create();
            using (var outputFile = System.IO.File.OpenWrite(TrainingDataLocation))
            {
                storage.DownloadObject(bucketPath, "ratings_train.csv", outputFile);
            }
            using (var outputFile = System.IO.File.OpenWrite(TestDataLocation))
            {
                storage.DownloadObject(bucketPath, "ratings_test.csv", outputFile);
            }

            //set up the ML environment and create the "reader" by defining the way it should read from the dataset files
            var ctx = new MLContext();
            var reader = ctx.Data.TextReader(new TextLoader.Arguments()
            {
                Separator = ",",
                HasHeader = true,
                Column = new[]
                {
                    new TextLoader.Column("userId", DataKind.Text, 0),
                    new TextLoader.Column("serviceId", DataKind.Text, 1),
                    new TextLoader.Column("Label", DataKind.R4, 2)
                }
            });

            //read the training data and test data which will be used to train and test the service recommendation model
            IDataView trainingDataView = reader.Read(TrainingDataLocation);
            IDataView testDataView = reader.Read(TestDataLocation);

            //transform the data by encoding the two features (userId, serviceID) to later provide them as input to the learner
            var pipeline = ctx.Transforms.Categorical.OneHotEncoding("userId", "userIdEncoded").
                                          Append(ctx.Transforms.Categorical.OneHotEncoding("serviceId", "serviceIdEncoded").
                                          Append(ctx.Transforms.Concatenate("Features", "userIdEncoded", "serviceIdEncoded")).
                                          Append(ctx.BinaryClassification.Trainers.FieldAwareFactorizationMachine(label: "Label", features: new string[] {
                                                                                                                                      "Features"})));
            //train the model by fitting it with our dataset then save the model to disk (locally)
            var model = pipeline.Fit(trainingDataView);
            using (var fs = new FileStream(ModelPath, FileMode.Create, FileAccess.Write, FileShare.Write))
                ctx.Model.Save(model, fs);

            //upload the latest model from the local temp path and store it in the google bucket for later use
            using (var inputFile = System.IO.File.OpenRead(@"./Model/model.zip"))
            {
                storage.UploadObject(bucketPath, "model.zip", null, inputFile);
            }

            return new string[] { "Successfully grabbed the latest ratings and exported their data model to the GCP Storage Bucket " + bucketPath + "! :)" };
        }
    }
}
