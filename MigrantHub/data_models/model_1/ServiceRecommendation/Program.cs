using System;
using Microsoft.ML;
using Microsoft.ML.Trainers.Recommender;
using Microsoft.ML.Runtime.Data;
using Microsoft.ML.Trainers;

using ServiceRecommendationConsoleApp.DataStructures;
using ServiceRecommendation.DataStructures;

namespace ServiceRecommendation
{
    class Program
    {
        // Using the ml-latest-small.zip as dataset from https://grouplens.org/datasets/movielens/. 
        private static string ModelsLocation = @"../../../../MLModels";
        public static string DatasetsLocation = @"../Data";
        private static string TrainingDataLocation = $"{DatasetsLocation}/recommendation-ratings-train.csv";
        private static string TestDataLocation = $"{DatasetsLocation}/recommendation-ratings-test.csv";
        private static string ServicesDataLocation = $"{DatasetsLocation}/services.csv";
        private const float predictionuserId = 6;
        private const int predictionserviceId = 10;
  
        static void Main(string[] args)
        {
            //STEP 1: Create MLContext to be shared across the model creation workflow objects 
            var mlcontext = new MLContext();

            //STEP 2: Create a reader by defining the schema for reading the service recommendation datasets
            var reader = mlcontext.Data.TextReader(new TextLoader.Arguments()
            {
                Separator = ",",
                HasHeader = true,
                Column = new[]
                {
                    new TextLoader.Column("userId", DataKind.R4, 0),
                    new TextLoader.Column("serviceId", DataKind.R4, 1),
                    new TextLoader.Column("Label", DataKind.R4, 2)
                }
            });

            //STEP 3: Read the training data which will be used to train the service recommendation model
            IDataView trainingDataView = reader.Read(TrainingDataLocation);

            //STEP 4: Transform your data by encoding the two features userId and serviceID. These encoded features will be provided as input
            //        to our MatrixFactorizationTrainer.
            var pipeline = mlcontext.Transforms.Categorical.MapValueToKey("userId", "userIdEncoded")
                                    .Append(mlcontext.Transforms.Categorical.MapValueToKey("serviceId", "serviceIdEncoded")
                                    .Append(new MatrixFactorizationTrainer(mlcontext, "Label", "userIdEncoded", "serviceIdEncoded",
                                    advancedSettings: s => { s.NumIterations = 20; s.K = 100; })));

            //STEP 5: Train the model fitting to the DataSet
            Console.WriteLine("=============== Training the model ===============");
            var model = pipeline.Fit(trainingDataView);

            //STEP 6: Evaluate the model performance 
            Console.WriteLine("=============== Evaluating the model ===============");
            IDataView testDataView = reader.Read(TestDataLocation);
            var prediction = model.Transform(testDataView);
            var metrics = mlcontext.Regression.Evaluate(prediction, label: "Label", score: "Score");
            Console.WriteLine("The model evaluation metrics rms:" + Math.Round(float.Parse(metrics.Rms.ToString()), 1));


            //STEP 7:  Try/test a single prediction by predicting a single service rating for a specific user
            var predictionengine = model.MakePredictionFunction<ServiceRating, ServiceRatingPrediction>(mlcontext);
            /* Make a single service rating prediction, the scores are for a particular user and will range from 1 - 5. 
               The higher the score the higher the likelyhood of a user liking a particular service.
               You can recommend a service to a user if say rating > 3.5.*/
            var serviceratingprediction = predictionengine.Predict(
                new ServiceRating()
                {
                    //Example rating prediction for userId = 6, serviceId = 10 (GoldenEye)
                    userId = predictionuserId,
                    serviceId = predictionserviceId
                }
            );

           Service newService = new Service();
           Console.WriteLine("For userId:" + predictionuserId + " service rating prediction (1 - 5 stars) for service:" + newService.Get(predictionserviceId).serviceTitle + " is:" + Math.Round(serviceratingprediction.Score,1));
        }

    }
}
