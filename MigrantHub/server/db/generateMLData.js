const fs = require('fs');

const mongoose = require('mongoose');
const { dbConnectionString } = require('../config');
const User = require('../models/User');
const Review = require('../models/Review');
const Service = require('../models/Service');

const connectionString = dbConnectionString();

async function generateServiceReviewsData() {
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
  let services = await Service.find({});
  let retrievedServices = services.map(function(doc) {
    let text = doc._id + ';' + doc.serviceTitle;
    if(!doc.deleted) {
      fs.appendFile("./allServices.csv", [text + '\n'], function(err) {
        if(err) {
            console.log(err);
        }
      })
    }
  });

  await Promise.all(retrievedServices);

  // ratings.csv
  let reviews = await Review.find({});

  let retrievedReviews = await reviews.map(async (doc) => {
    //get the age before writing to the file
    let user = await User.findOne({_id: doc.user});
    const userObject = user.toObject();

    let text = doc.user + ';' + doc.serviceId + ';' + userObject.age + ';' + doc.rating + '; 0000';
    console.log(text);

    if (!doc.deleted) {
      fs.appendFile("./ratings.csv", [text + '\n'], function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
    return doc;
  });
  await Promise.all(retrievedReviews);
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
async function run() {
  console.log('Starting generate ML data...');
  mongoose.connect(connectionString);
  await generateServiceReviewsData();
  await uploadFile('data_model_files', './allServices.csv');
  await uploadFile('data_model_files', './ratings.csv');
  mongoose.disconnect();
  console.log('Generate ML data complete');
}

run();