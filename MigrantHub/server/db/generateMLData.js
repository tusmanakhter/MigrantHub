const { dbConfig } = require('../config');
const express = require('express');
const fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
const { dbConnectionString } = require('../config');

const url = dbConnectionString(); 

function generateServiceReviewsData() {

  // FILE CREATION
  // File of all services
  fs.writeFile("./allServices.csv", "", function(err){
    if(err) {
        console.log(err);
    }
  });

  // File of service reviews
  fs.writeFile("./ratings.csv", "", function(err){
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
        fs.appendFile("./allServices.csv", [text + '\n'], function(err) {
          if(err) {
              console.log(err);
          }
        })
      }
    }, function(err) {
      uploadFile('data_model_files', './allServices.csv');
      if(err) {
        console.log(err);
      }
    });
  });

  // ratings.csv
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("migranthub");
    dbo.collection("reviews").find({}).forEach(function(doc) {
      //get the age before writing to the file
      dbo.collection("users").findOne({ _id: doc.user })
      .then(function(user) {
        var text = doc.user + ';' + doc.serviceId + ';' + user.age + ';' + doc.rating + '; 0000';
        if(!doc.deleted) {
          fs.appendFile("./ratings.csv", ['\n' + text], function(err) {
            if(err) {
                console.log(err);
            }
          })
        }
      })
    }, function(err) {
      uploadFile('data_model_files', './ratings.csv');
      if(err) {
        console.log(err);
      }
    });
  });
};

// Upload to Google Storage Bucket
async function uploadFile(bucketName, filename) {
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

generateServiceReviewsData();
