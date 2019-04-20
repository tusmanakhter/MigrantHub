using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ML;
using Microsoft.ML.Data;
using Google.Cloud.Storage.V1;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;

namespace Service_Recommender.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        // GET api/recommendation/{id}/{age}
        [HttpGet("{id}/{age}")]
        public ActionResult<string> Get(string id, string age)
        {
            string modelPath = @"./model.zip";
            string allServicesPath = @"./allServices.csv";
            string bucketPath = "data_model_files";

            //set up the access to the google storage bucket
            string googleKeyPath = @"./key.json";
            System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", googleKeyPath);

            //download the latest model and list of all services from the google bucket and store them locally for temp use
            var storage = StorageClient.Create();
            using (var outputFile = System.IO.File.OpenWrite(modelPath))
            {
                storage.DownloadObject(bucketPath, "model.zip", outputFile);
            }
            using (var outputFile = System.IO.File.OpenWrite(allServicesPath))
            {
                storage.DownloadObject(bucketPath, "allServices.csv", outputFile);
            }

            // create the local environment and load the ServicesRecommendation Model
            MLContext mlContext = new MLContext();

            ITransformer loadedModel = mlContext.Model.Load(modelPath, out var modelInputSchema);

            //fetch the list of all service ids and put them into an array
            string[] serviceIds = System.IO.File.ReadAllLines(allServicesPath);

            //create a prediction function
            var predictionEngine = mlContext.Model.CreatePredictionEngine<ServiceRating, ServiceRatingPrediction>(loadedModel);

            // find the rating prediction for each service and compile the normalized predictions into a list
            List<Tuple<String, float>> predictions = new List<Tuple<String, float>>();

            ServiceRatingPrediction prediction = null;
            for (var i = 0; i < serviceIds.Length; i++)
            {
                var serviceLine = serviceIds[i].Split(';');
                var serviceId = serviceLine[0];

                prediction = predictionEngine.Predict(new ServiceRating { userId = id.ToString(), serviceId = serviceId, userAge = age.ToString()});

                var normalizedscore = Sigmoid(prediction.Score);

                predictions.Add(Tuple.Create(serviceId, normalizedscore));
            }

            //get the top 3 predictions
            predictions.Sort((x, y) => y.Item2.CompareTo(x.Item2));
            if (predictions.Count > 3) predictions.RemoveRange(3, predictions.Count - 3);

            //return the predictions in string format
            var recommendations = string.Join(";", predictions.Select(t => string.Format("[ '{0}'; '{1}']", t.Item1, t.Item2)));

            //method should clean up after itself
            if (System.IO.File.Exists(modelPath)) System.IO.File.Delete(modelPath);
            if (System.IO.File.Exists(allServicesPath)) System.IO.File.Delete(allServicesPath);

            return recommendations;
        }

        public class ServiceRating
        {
            public string userId;

            public string serviceId;

            public string userAge;

            public bool Label;
        }

        public class ServiceRatingPrediction
        {
            public bool predictedLabel;

            public float Score;
        }

        public float Sigmoid(float x)
        {
            return (float)(100 / (1 + Math.Exp(-x)));
        }
    }
}
