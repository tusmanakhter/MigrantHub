const { dbConfig } = require('../config');
const express = require('express');
const fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
const { db: { host, port, name } } = dbConfig;
const url = `mongodb://${host}:${port}/${name}`;

this.generateServiceRecommendationData = function generateServiceReviewsData() {

  // FILE CREATION
  // File of all services
  fs.writeFile("../data_models/Service_Rating_Model/Service_Recommender/Data/allServices.csv", "", function(err){
    if(err) {
        console.log(err);
    }
  });

  // File of service reviews
  fs.writeFile("../data_models/Service_Rating_Model/Service_Recommender/Data/serviceReviews.csv", "userId,serviceId,ratinguser", function(err){
    if(err) {
        console.log(err);
    }
  });

  // FILE POPULATION
  // allServices.csv
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("migranthub");
    dbo.collection("services").find({}).forEach(function(doc) {
      var text = doc._id + ',' + doc.serviceTitle + '\n';
      if(!doc.deleted) {
        fs.appendFile("../data_models/Service_Rating_Model/Service_Recommender/Data/allServices.csv", [text], function(err) {
          if(err) {
              console.log(err);
          }
        })
      }
    }, function(err) {
      //uploadFile('data_model_files', '../data_models/Service_Rating_Model/Service_Recommender/Data/allServices.csv');
      if(err) {
        console.log(err);
      }
    });
  });

  // serviceReviews.csv
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("migranthub");
    dbo.collection("reviews").find({}).forEach(function(doc) {
      var text = '\n' + doc.user + ',' + doc.serviceId + ',' + doc.rating;
      if(!doc.deleted) {
        fs.appendFile("../data_models/Service_Rating_Model/Service_Recommender/Data/ratings.csv", [text], function(err) {
          if(err) {
              console.log(err);
          }
        })
      }
    }, function(err) {
      //uploadFile('data_model_files', '../data_models/Service_Rating_Model/Service_Recommender/Data/ratings.csv');
      if(err) {
        console.log(err);
      }
    });
  });
};


// COMMENTED OUT uploadFile() SO IT DOESNT RUN LOCALLY! WILL BE UNCOMMENTED ONCE IN THE CLOUD

// // Upload to Google Storage Bucket
// async function uploadFile(bucketName, filename) {
//   // Imports the Google Cloud client library
//   const {Storage} = require('@google-cloud/storage');

//   // Creates a client
//   const storage = new Storage();

//   // Uploads a local file to the bucket
//   await storage.bucket(bucketName).upload(filename, {
//     // Support for HTTP requests made with `Accept-Encoding: gzip`
//     gzip: true,
//     metadata: {
//       cacheControl: 'no-cache',
//     },
//   });
// }
