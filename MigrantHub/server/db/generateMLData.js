const { dbConfig } = require('../config');
const fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
const { db: { host, port, name } } = dbConfig;
const url = `mongodb://${host}:${port}/${name}`;

this.generateModel1 = function generateServiceReviewsData() {

  // FILE CREATION
  // File of all services
  fs.writeFile("../data_models/model_1/Data/allServices.csv", "serviceId,serviceTitle", function(err){
    if(err) {
        console.log(err);
    }
  });

  // File of service reviews
  fs.writeFile("../data_models/model_1/Data/serviceReviews.csv", "userId,serviceId,ratinguser", function(err){
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
      var text = '\n' + doc._id + ',' + doc.serviceTitle;
      fs.appendFile("../data_models/model_1/Data/allServices.csv", [text], function(err) {
          if(err) {
              console.log(err);
          }
      })
    }, function(err) {
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
      fs.appendFile("../data_models/model_1/Data/serviceReviews.csv", [text], function(err) {
          if(err) {
              console.log(err);
          }
      })
    }, function(err) {
      if(err) {
        console.log(err);
      }
    });
  });
};
