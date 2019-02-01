#! /usr/bin/env node
const faker = require('faker');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function insertAdmins() {
  const promises = [];
  for (let i = 0; i < 100; i += 1) {
    const admin = new Admin();
    admin._id = faker.internet.email();
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
    admin.email = faker.internet.email();
    admin.localAuthentication = {};
    admin.localAuthentication.password = faker.random.number(32);
    promises.push(admin.save());
  }
  await Promise.all(promises);
}

async function run() {
  mongoose.connect('mongodb://127.0.0.1:27017/migranthub');
  await insertAdmins();
  mongoose.disconnect();
}

run();
