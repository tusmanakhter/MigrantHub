#! /usr/bin/env node

const mongoose = require('mongoose');
const { dbConnectionString } = require('../config');
const fs = require('fs');

const Service = require('../models/Service');

const connectionString = dbConnectionString();

mongoose.Promise = global.Promise;
mongoose.connect(connectionString, (error) => {
  if (error) {
    console.error('Check if MongoDB is installed and running.');
    throw error;
  }
});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connection error: '));


//Inputting all the Services Located in Montreal
const servicesSchemaKeyList = ['category', 'subcategory', 'acronym', 'serviceTitle',
'serviceDescription', 'address', 'apartment', 'city', 'province', 'postalCode',
'metro', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
'openHours', 'phoneNumber', 'phoneNumber2', 'fax', 'website', 'email', 'notes'];
const date = new Date();
const path = require("path");
const lineList = fs.readFileSync(path.resolve(__dirname, "../db/MtlOrgsCvsHours.csv")).toString().split('\n');
lineList.shift(); // Shift the headings off the list of records.

// Recursively go through file adding services.
function createDocRecurse(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  if (lineList.length) {
    const line = lineList.shift();
    const doc = new Service();
    const location = {
      address: '',
      apartment: '',
      city: '',
      province: '',
      postalCode: '',
      metro: '',
      phoneNumber: '',
      phoneNumber2: '',
    };

    const serviceHour = {
      serviceDay: '',
      startTime: '',
      endTime: '',
    };

    line.split(';').forEach((entry, i) => {
      doc.user = 'admin@migranhub.com';
      doc[servicesSchemaKeyList[i]] = entry;
      doc.dateCreated = date;

      // Location
      if (i === 5) location.address = entry;
      else if (i === 6) location.apartment = entry;
      else if (i === 7) location.city = entry;
      else if (i === 8) location.province = entry;
      else if (i === 9) location.postalCode = entry;
      else if (i === 10) location.metro = entry;
      else if (i === 19) location.phoneNumber = entry;
      else if (i === 20) location.phoneNumber2 = entry;
      else if (i === 21) doc.location = location;

      var serviceTime;
      //Hours
      if (i === 11) { 
        if(entry.length > 0){
          serviceTime = entry.split('-');
          serviceHour.serviceDay = "Sunday";
          serviceHour.startTime = serviceTime.toString().substring(0,5);
          serviceHour.endTime = serviceTime.toString().substring(6,11);
          doc.serviceHours.push(serviceHour);
        }
      }
      else if (i === 12) {
        if(entry.length > 0){
          serviceTime = entry.split('-');
          serviceHour.serviceDay = "Monday";
          serviceHour.startTime = serviceTime.toString().substring(0,5);
          serviceHour.endTime = serviceTime.toString().substring(6,11);
          doc.serviceHours.push(serviceHour);
        }
      }
      else if (i === 13) {
        if(entry.length > 0){
          serviceTime = entry.split('-');
          serviceHour.serviceDay = "Tuesday";
          serviceHour.startTime = serviceTime.toString().substring(0,5);
          serviceHour.endTime = serviceTime.toString().substring(6,11);
          doc.serviceHours.push(serviceHour);
        }
      }
      else if (i === 14) {
        if(entry.length > 0){
          serviceTime = entry.split('-');
          serviceHour.serviceDay = "Wednesday";
          serviceHour.startTime = serviceTime.toString().substring(0,5);
          serviceHour.endTime = serviceTime.toString().substring(6,11);
          doc.serviceHours.push(serviceHour);
        }
      }
      else if (i === 15) {
        if(entry.length > 0){
          serviceTime = entry.split('-');
          serviceHour.serviceDay = "Thursday";
          serviceHour.startTime = serviceTime.toString().substring(0,5);
          serviceHour.endTime = serviceTime.toString().substring(6,11);
          doc.serviceHours.push(serviceHour);
        }
      }
      else if (i === 16) {
        if(entry.length > 0){
          serviceTime = entry.split('-');
          serviceHour.serviceDay = "Friday";
          serviceHour.startTime = serviceTime.toString().substring(0,5);
          serviceHour.endTime = serviceTime.toString().substring(6,11);
          doc.serviceHours.push(serviceHour);
        }
      }
      else if (i === 17) {
        if(entry.length > 0){
          serviceTime = entry.split('-');
          serviceHour.serviceDay = "Saturday";
          serviceHour.startTime = serviceTime.toString().substring(0,5);
          serviceHour.endTime = serviceTime.toString().substring(6,11);
          doc.serviceHours.push(serviceHour);
        }
      }

      doc.serviceImagePath = "/uploads/default/refugeecentrelogo.png";
    });
    doc.save(createDocRecurse);
  }
}

createDocRecurse(null);