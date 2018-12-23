const bcrypt = require('bcryptjs');
const BusinessAccountValidator = require('../validators/BusinessAccountValidator');
const MigrantAccountValidator = require('../validators/MigrantAccountValidator');
const AdminAccountValidator = require('../validators/AdminAccountValidator');
const MigrantRepository = require('../repository/MigrantRepository');
const BusinessRepository = require('../repository/BusinessRepository');
const AdminRepository = require('../repository/AdminRepository');

module.exports = {
  async createUser(parsedMigrantUserObject) {
    const migrantUserObject = parsedMigrantUserObject;
    const errors = await MigrantAccountValidator.migrantAccountValidator(migrantUserObject);

    if (errors === '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(migrantUserObject.password, salt);
      migrantUserObject.password = hash;

      return MigrantRepository.createUser(migrantUserObject);
    }
    throw new Error('There was an error creating migrant user.');
  },

  async createBusiness(parsedBusinessUserObject) {
    const businessUserObject = parsedBusinessUserObject;
    const errors = await BusinessAccountValidator.businessAccountValidator(businessUserObject);

    if (errors === '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(businessUserObject.password, salt);
      businessUserObject.password = hash;

      return BusinessRepository.createBusiness(businessUserObject);
    }
    throw new Error('There was an error creating business user.');
  },

  async createAdmin(parsedAdminUserObject) {
    const adminUserObject = parsedAdminUserObject;
    const errors = await AdminAccountValidator.adminAccountValidator(adminUserObject);

    if (errors === '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(adminUserObject.password, salt);
      adminUserObject.password = hash;

      return AdminRepository.createAdmin(adminUserObject);
    }
    throw new Error('There was an error creating admin user.');
  },
};
