const BusinessUser = require('../models/BusinessUser');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  createBusiness(businessUserObject) {
    const businessUser = new BusinessUser();
    businessUser._id = businessUserObject.email.toLowerCase();
    businessUser.email = businessUserObject.email.toLowerCase();
    businessUser.userType = 'local';
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

    return businessUser.save().then(() => Promise.resolve('Business User has been created.')).catch((error) => {
      throw new ServerError('There was an error saving business user.', 400, error);
    });
  },

  getBusinessUser(businessUserId) {
    return BusinessUser.findOne({ _id: businessUserId.toLowerCase() }).exec()
      .then(businessUser => Promise.resolve(businessUser)).catch((error) => {
        throw new ServerError('There was an error retrieving business user.', 400, error);
      });
  },

  editBusinessUser(businessUserId, businessUserObject) {
    return BusinessUser.findByIdAndUpdate({ _id: businessUserId.toLowerCase() }, businessUserObject,
      { new: true }).exec().then(() => Promise.resolve('Business user has been updated.')).catch((error) => {
      throw new ServerError('There was an error retrieving updating business user.', 400, error);
    });
  },
};
