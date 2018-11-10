const proxy = require('http-proxy-middleware');
require('dotenv').config();

module.exports = function (app) {
  app.use(proxy('/api', { target: process.env.PROXY || "http://localhost:5000" }));
};
