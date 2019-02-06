const { dbConfig } = require('../config');
const express = require('express');
const fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
const { dbConnectionString } = require('../config');

const url = dbConnectionString(); 

this.generateServiceRecommendationData = function generateServiceReviewsData() {

  // FILE CREATION
  // File of all services
  fs.writeFile("../data_models/Service_Rating_Model/Service_Recommender/allServices.csv", "", function(err){
    if(err) {
        console.log(err);
    }
  });

  // File of service reviews
  fs.writeFile("../data_models/Service_Rating_Model/Service_Recommender/ratings.csv", "", function(err){
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
      var text = doc._id + ';' + doc.serviceTitle;
      if(!doc.deleted) {
        fs.appendFile("../data_models/Service_Rating_Model/Service_Recommender/allServices.csv", [text + '\n'], function(err) {
          if(err) {
              console.log(err);
          }
        })
      }
    }, function(err) {
      uploadFile('data_model_files', '../data_models/Service_Rating_Model/Service_Recommender/allServices.csv');
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
      var text = doc.user + ';' + doc.serviceId + ';' + doc.rating + '; 0000';
      if(!doc.deleted) {
        fs.appendFile("../data_models/Service_Rating_Model/Service_Recommender/ratings.csv", ['\n' + text], function(err) {
          if(err) {
              console.log(err);
          }
        })
      }
    }, function(err) {
      uploadFile('data_model_files', '../data_models/Service_Rating_Model/Service_Recommender/ratings.csv');
      if(err) {
        console.log(err);
      }
    });
  });
};


// COMMENTED OUT uploadFile() SO IT DOESNT RUN LOCALLY! WILL BE UNCOMMENTED ONCE IN THE CLOUD

// Upload to Google Storage Bucket
async function uploadFile(bucketName, filename) {
  if(process.env.MONGO_ATLAS) {
    // Imports the Google Cloud client library
    const {Storage} = require('@google-cloud/storage');
  
    // Creates a client
    const storage = new Storage();
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: {
        cacheControl: 'no-cache',
      },
    });
  }
}


