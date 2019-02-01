using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ML;
using Microsoft.ML.Runtime.Api;
using Microsoft.ML.Runtime.Data;
using Microsoft.ML.Core.Data;
using Google.Cloud.Storage.V1;

namespace Service_Recommender.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        // GET api/recommendation/{id}
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
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
            var ctx = new MLContext();

            ITransformer loadedModel;
            using (var stream = new FileStream(modelPath, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                loadedModel = ctx.Model.Load(stream);
            }

            //fetch the list of all service ids and put them into an array
            string[] serviceIds = System.IO.File.ReadAllLines(allServicesPath);

            //create a prediction function
            var predictionfunction = loadedModel.MakePredictionFunction<RatingData, RatingPrediction>(ctx);

            // find the rating prediction for each service and compile the normalized predictions into a list
            List<Tuple<String, float>> predictions = new List<Tuple<String, float>>();

            RatingPrediction prediction = null;
            for (var i = 0; i < serviceIds.Length; i++)
            {
                var serviceLine = serviceIds[i].Split(';');
                var serviceId = serviceLine[0];

                prediction = predictionfunction.Predict(new RatingData { userId = id.ToString(), serviceId = serviceId });

                var normalizedscore = Sigmoid(prediction.Score);

                predictions.Add(Tuple.Create(serviceId, normalizedscore));
            }

            //get the top 3 predictions
            predictions.Sort((x, y) => y.Item2.CompareTo(x.Item2));
            if (predictions.Count > 3) predictions.RemoveRange(3, predictions.Count - 3);

            //return the predictions in string format
            var recommendations = string.Join(";", predictions.Select(t => string.Format("[ '{0}'; '{1}']", t.Item1, t.Item2)));

            return recommendations;
        }

        public class RatingData
        {
            [Column("0")]
            public string userId;

            [Column("1")]
            public string serviceId;

            [Column("2")]
            [ColumnName("Label")]
            public float Label;
        }

        public class RatingPrediction
        {
            [ColumnName("PredictedLabel")]
            public bool predictedLabel;

            public float Score;
        }

        public float Sigmoid(float x)
        {
            return (float)(100 / (1 + Math.Exp(-x)));
        }
    }
}
