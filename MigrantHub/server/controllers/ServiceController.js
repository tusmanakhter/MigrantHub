const qs = require('qs');
const multer = require('multer');
const fs = require('fs-extra');
const ServiceService = require('../service/ServiceService');

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    const path = `uploads/${req.session.passport.user._id}/services/`;
    fs.ensureDirSync(path);
    cb(null, path);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = {

  upload: multer({ storage: multerStorage }),

  async createService(user, serviceObject) {
    const parsedServiceObj = qs.parse(serviceObject);
    return ServiceService.createService(user, parsedServiceObj);
  },

  async getServices(userId, searchQuery, search, category, subcategory) {
    return ServiceService.getServices(userId, searchQuery, search, category, subcategory);
  },

  async getService(serviceId) {
    return ServiceService.getService(serviceId);
  },

  async updateService(user, serviceObject) {
    const parsedServiceObj = qs.parse(serviceObject);
    return ServiceService.updateService(user, parsedServiceObj);
  },

  async deleteService(serviceId) {
    return ServiceService.deleteService(serviceId);
  },
};
