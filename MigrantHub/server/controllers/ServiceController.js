const qs = require('qs');
const multer = require('multer');
const fs = require('fs-extra');
const ServicesService = require('../service/ServicesService');

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
    return ServicesService.createService(user, parsedServiceObj);
  },

  async getServices(editOwner, searchQuery, search) {
    return ServicesService.getServices(editOwner, searchQuery, search);
  },

  async getService(serviceId) {
    return ServicesService.getService(serviceId);
  },

  async updateService(user, serviceObject) {
    const parsedServiceObj = qs.parse(serviceObject);
    return ServicesService.updateService(user, parsedServiceObj);
  },

  async deleteService(serviceId) {
    return ServicesService.deleteService(serviceId);
  },
};
