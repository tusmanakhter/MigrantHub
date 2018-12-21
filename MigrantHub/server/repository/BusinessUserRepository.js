const BusinessUser = require('../models/BusinessUser');

module.exports = {
  createBusiness(businessUserObject) {
    const businessUser = new BusinessUser();
    businessUser._id = businessUserObject.email;
    businessUser.email = businessUserObject.email;
    businessUser.localAuthentication = {
      password: businessUserObject.password,
    };
    businessUser.corpId = businessUserObject.corpId;
    businessUser.firstName = businessUserObject.firstName;
    businessUser.lastName = businessUserObject.lastName;
    businessUser.address = businessUserObject.address;
    businessUser.apartment = businessUserObject.apartment;
    businessUser.city = businessUserObject.city;
    businessUser.province = businessUserObject.province;
    businessUser.postalCode = businessUserObject.postalCode;
    businessUser.phoneNumber = businessUserObject.phoneNumber;
    businessUser.organizationName = businessUserObject.organizationName;
    businessUser.orgType = businessUserObject.orgType;
    businessUser.department = businessUserObject.department;
    businessUser.serviceType = businessUserObject.serviceType;
    businessUser.description = businessUserObject.description;

    return businessUser.save().then(() => Promise.resolve('Business User has been created.')).catch(() => {
      throw new Error('There was an error saving business user.');
    });
  },
};
