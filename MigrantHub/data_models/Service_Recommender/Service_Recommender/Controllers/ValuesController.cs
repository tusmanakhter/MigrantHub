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

namespace Service_Recommender.Controllers
{
    public class RatingData
    {
        public string userId;

        public string serviceId;

        public float Label;
    }

    public class RatingPrediction
    {
        public bool PredictedLabel;

        public float Score;
    }

    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
        
        string TrainingDataLocation = @"./Data/ratings_train.csv";
        string TestDataLocation = @"./Data/ratings_test.csv";
        string ModelPath = @"./Model/model.zip";

            //STEP 1: set up the environment for the ML to take place
            var ctx = new MLContext();

            //STEP 2: create the "reader" by defining the way it should read from the dataset files
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

            //STEP 3: Read the training data and test data which will be used to train and test the service recommendation model
            IDataView trainingDataView = reader.Read(TrainingDataLocation);
            IDataView testDataView = reader.Read(TestDataLocation);

            //STEP 4: Transform your data by encoding the two features userId and serviceID. 
            //        These encoded features will be provided as input to FieldAwareFactorizationMachine learner
            var pipeline = ctx.Transforms.Categorical.OneHotEncoding("userId", "userIdEncoded").
                                          Append(ctx.Transforms.Categorical.OneHotEncoding("serviceId", "serviceIdEncoded").
                                          Append(ctx.Transforms.Concatenate("Features", "userIdEncoded", "serviceIdEncoded")).
                                          Append(ctx.BinaryClassification.Trainers.FieldAwareFactorizationMachine(label: "Label", features: new string[] {
                                                                                                                                      "Features"})));
            //STEP 5: Train the model fitting to the DataSet  
            Console.WriteLine("=============== Training the model ===============");
            var model = pipeline.Fit(trainingDataView);

            //STEP 6: Evaluate the model performance 
            Console.WriteLine("=============== Evaluating the model ===============");
            var prediction = model.Transform(testDataView);
            var metrics = ctx.BinaryClassification.Evaluate(prediction, label: "Label", score: "Score", predictedLabel: "PredictedLabel");
            Console.WriteLine("Evaluation Metrics: acc:" + Math.Round(metrics.Accuracy, 2) + " auc:" + Math.Round(metrics.Auc, 2));

            //STEP 7:  Try/test a single prediction by predicting a single service rating for a specific user
            var predictionengine = model.MakePredictionFunction<RatingData, RatingPrediction>(ctx);
            var serviceratingprediction = predictionengine.Predict(
                            new RatingData()
                            {
                                //Example rating prediction for userId = 6, serviceId = 10 (GoldenEye)
                                userId = "6",
                                serviceId = "10"
                            }
                        );

            //STEP 8:  Save model to disk 
            Console.WriteLine("=============== Writing model to disk ===============");
            using (var fs = new FileStream(ModelPath, FileMode.Create, FileAccess.Write, FileShare.Write))
                ctx.Model.Save(model, fs);

            return new string[] { "value1", "value2" };

        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
