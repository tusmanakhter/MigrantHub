using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using servicerecommender.Models;
using Newtonsoft.Json;
using Microsoft.ML;
using Microsoft.ML.Runtime.Api;
using Microsoft.ML.Runtime.Data;
using Microsoft.ML.Runtime.Learners;
using Microsoft.ML.Runtime;
using Microsoft.ML.Runtime.Data;
using Microsoft.ML.Core.Data;
using Microsoft.ML.Runtime.Training;
using Microsoft.ML;
using Microsoft.ML.StaticPipe;
using Microsoft.ML.Trainers;
using System.IO;

namespace servicerecommender.Controllers
{
    public class StringTable
    {
        public string[] ColumnNames { get; set; }
        public string[,] Values { get; set; }
    }

    public class ServicesController : Controller
    {
        private readonly ServiceService _serviceService;
        private readonly ProfileService _profileService;
        private readonly AppSettings _appSettings;
        //private static HttpClient Client = new HttpClient();
        private readonly ILogger<ServicesController> _logger;

        public ServicesController(ILogger<ServicesController> logger, IOptions<AppSettings> appSettings)
        {
            _serviceService = new ServiceService();
            _profileService = new ProfileService();
            _logger = logger;
            _appSettings = appSettings.Value;
        }

        public ActionResult Choose()
        {
            return View(_serviceService.GetSomeSuggestions());
        }

        static async Task<string> InvokeRequestResponseService(int id, ILogger logger, AppSettings appSettings)
        {
            return null;
        }

        public ActionResult Recommend(int id)
        {
            Profile activeprofile = _profileService.GetProfileByID(id);

            // 1. Create the local environment
            var ctx = new MLContext();

            //2. Load the ServicesRecommendation Model
            ITransformer loadedModel;
            using (var stream = new FileStream(_serviceService.GetModelPath(), FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                loadedModel = ctx.Model.Load(stream);
            }

            //3. Create a prediction function
            var predictionfunction = loadedModel.MakePredictionFunction<RatingData, RatingPrediction>(ctx);
            
            List<Tuple<int, float>> ratings = new List<Tuple<int, float>>();
            List<Tuple<int, int>> ServiceRatings = _profileService.GetProfileWatchedServices(id);
            List<Service> WatchedServices = new List<Service>();

            foreach (Tuple<int, int> tuple in ServiceRatings)
            {
                WatchedServices.Add(_serviceService.Get(tuple.Item1));
            }

            // 3. Create an Rating Prediction Output Class
            RatingPrediction prediction = null;
            foreach (var service in _serviceService._trendingServices)
            {
            //4. Call the Rating Prediction for each service prediction
             prediction = predictionfunction.Predict(new RatingData { userId = id.ToString(), serviceId = service.ServiceID.ToString()});
              
            //5. Normalize the prediction scores for the "ratings" b/w 0 - 100
             var normalizedscore = Sigmoid(prediction.Score);

            //6. Add the score for recommendation of each service in the trending service list
             ratings.Add(Tuple.Create(service.ServiceID, normalizedscore));
            }

            //5. Provide ratings to the view to be displayed
            ViewData["watchedservices"] = WatchedServices;
            ViewData["ratings"] = ratings;
            ViewData["trendingservices"] = _serviceService._trendingServices;
            return View(activeprofile);
        }

        public float Sigmoid(float x)
        {
            return (float) (100/(1 + Math.Exp(-x)));
        }

        public ActionResult Watch()
        {
            return View();
        }

        public ActionResult Profiles()
        {

            List<Profile> profiles = _profileService._profile;
            return View(profiles);
        }

        public ActionResult Watched(int id)
        {
            Profile activeprofile = _profileService.GetProfileByID(id);
            List<Tuple<int,int>> ServiceRatings = _profileService.GetProfileWatchedServices(id);
            List<Service> WatchedServices = new List<Service>();

            foreach (Tuple<int,int> tuple in ServiceRatings)
            {
                WatchedServices.Add(_serviceService.Get(tuple.Item1));
            }
            ViewData["watchedservices"] = WatchedServices;
            ViewData["trendingservices"] = _serviceService._trendingServices;
            return View(activeprofile);
        }

        public class JsonContent : StringContent
        {
            public JsonContent(object obj) :
                base(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json")
            { }
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

    }

}
