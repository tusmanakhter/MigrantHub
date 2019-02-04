#! /usr/bin/env node

const faker = require('faker');
const mongoose = require('mongoose');
const { dbConnectionString } = require('../config');
const Admin = require('../models/Admin');

const connectionString = dbConnectionString();

async function insertAdmins() {
  const promises = [];
  for (let i = 0; i < 100; i += 1) {
    const admin = new Admin();
    const email = faker.internet.email();

    admin._id = email;
    admin.authorized = faker.random.boolean();
    admin.rejected = faker.random.boolean();
    if (admin.rejected === true) {
      admin.rejectedDate = faker.date.recent();
    } else {
      admin.rejectedDate = null;
    }
    admin.deleted = faker.random.boolean();
    if (admin.deleted === true) {
      admin.deletedDate = faker.date.recent();
    } else {
      admin.deletedDate = null;
    }
    admin.type = 'admin';
    admin.userType = 'local';
    admin.email = email;
    admin.localAuthentication = {};
    admin.localAuthentication.password = faker.random.number(32);
    promises.push(admin.save());
  }
  await Promise.all(promises);
}

async function run() {
  console.log('Starting admin seeding...');
  mongoose.connect(connectionString);
  await insertAdmins();
  mongoose.disconnect();
  console.log('Admin seeding complete');
}

run();
