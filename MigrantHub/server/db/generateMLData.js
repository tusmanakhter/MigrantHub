const { dbConfig } = require('../config');
const fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
const { db: { host, port, name } } = dbConfig;
const url = `mongodb://${host}:${port}/${name}`;

this.generateModel1 = function generateServiceReviewsData() {
  fs.writeFile("../data_models/model_1/Data/reviewsDataModel.csv", "userId,serviceId,ratinguser", function(err){
    if(err) {
        console.log(err);
    }
  });

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("migranthub");
    dbo.collection("reviews").find({}).forEach(function(doc) {
      var text = '\n' + doc.user + ',' + doc.serviceId + ',' + doc.rating;
      fs.appendFile("../data_models/model_1/Data/reviewsDataModel.csv", [text], function(err) {
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
