using System;
using System.IO;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Microsoft.ML;
using Microsoft.ML.Runtime.Api;
using Microsoft.ML.Runtime.Data;
using Microsoft.ML.Runtime.Learners;
using Microsoft.ML.Runtime;
using Microsoft.ML.Core.Data;
using Microsoft.ML.Runtime.Training;
using Microsoft.ML.StaticPipe;
using Microsoft.ML.Trainers;
using Google.Apis.Storage.v1;
using Google.Cloud.Storage.V1;

namespace Service_Recommender.Controllers
{
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

    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        // GET api/recommendation/{id}
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            string modelPath = @"./Model/model.zip";
            string allServicesPath = @"./Model/allServices.csv";
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

            // create the local environment
            var ctx = new MLContext();

            //2. load the ServicesRecommendation Model
            ITransformer loadedModel;
            using (var stream = new FileStream(modelPath, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                loadedModel = ctx.Model.Load(stream);
            }

            //fetch the list of all service ids and put them into an array
            string[] serviceIds = System.IO.File.ReadAllLines(allServicesPath);

            //create a prediction function
            var predictionfunction = loadedModel.MakePredictionFunction<RatingData, RatingPrediction>(ctx);

            List<Tuple<int, float>> ratings = new List<Tuple<int, float>>();
            //List<Tuple<int, int>> ServiceRatings = _profileService.GetProfileWatchedServices(id);
            //List<Service> WatchedServices = new List<Service>();

            //foreach (Tuple<int, int> tuple in ServiceRatings)
            //{
            //    WatchedServices.Add(_serviceService.Get(tuple.Item1));
            //}

            // find the rating prediction for each service
            RatingPrediction prediction = null;
            //foreach (var service in serviceIds)
            for (var i = 0; i < serviceIds.Length; i++)
            {
                var serviceLine = serviceIds[i];
                var serviceLineSplit = serviceLine.Split(',');
                var serviceId = serviceLineSplit[0];
                
                //4. Call the Rating Prediction for each service prediction
                prediction = predictionfunction.Predict(new RatingData { userId = id.ToString(), serviceId = serviceId });

                //5. Normalize the prediction scores for the "ratings" b/w 0 - 100
                var normalizedscore = Sigmoid(prediction.Score);

                //6. Add the score for recommendation of each service in the trending service list
                ratings.Add(Tuple.Create(Int32.Parse(serviceId), normalizedscore));
            }

            //Get the top 3 predictions
            ratings.Sort((x, y) => y.Item2.CompareTo(x.Item2));
            if (ratings.Count > 3) ratings.RemoveRange(3, ratings.Count - 3);

            //return id.ToString();
            var output = string.Join(",", ratings.Select(t => string.Format("[ '{0}', '{1}']", t.Item1, t.Item2)));
            return output;
        }

        public float Sigmoid(float x)
        {
            return (float)(100 / (1 + Math.Exp(-x)));
        }
    }
}
