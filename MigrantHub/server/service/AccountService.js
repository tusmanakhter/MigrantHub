const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const BusinessAccountValidator = require('../validators/BusinessAccountValidator');
const MigrantAccountValidator = require('../validators/MigrantAccountValidator');
const AdminAccountValidator = require('../validators/AdminAccountValidator');
const MigrantRepository = require('../repository/MigrantRepository');
const BusinessRepository = require('../repository/BusinessRepository');
const AdminRepository = require('../repository/AdminRepository');
const UserRepository = require('../repository/UserRepository');
const { ServerError } = require('../errors/ServerError');
const SendEmail = require('../mail/SendEmail');

module.exports = {
  async createUser(parsedMigrantUserObject) {
    const migrantUserObject = parsedMigrantUserObject;
    const errors = await MigrantAccountValidator.migrantAccountValidator(migrantUserObject);

    if (errors === '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(migrantUserObject.password, salt);
      migrantUserObject.password = hash;

      await MigrantRepository.createUser(migrantUserObject);

      const receiverEmail = migrantUserObject.email;
      const subject = 'MigrantHub: Account Confirmation';
      const message = 'You have successfully created your MigrantHub user account. You are now able to login to the application.';
      SendEmail.sendEmail(receiverEmail, subject, message);

      return Promise.resolve('Migrant User has been created.');
    }
    throw new ServerError('There was an error creating migrant user.', 400, errors);
  },

  async createBusiness(parsedBusinessUserObject) {
    const businessUserObject = parsedBusinessUserObject;
    const errors = await BusinessAccountValidator.businessAccountValidator(businessUserObject);

    if (errors === '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(businessUserObject.password, salt);
      businessUserObject.password = hash;

      await BusinessRepository.createBusiness(businessUserObject);

      const receiverEmail = businessUserObject.email;
      const subject = 'MigrantHub: Account Confirmation';
      const message = 'You have successfully created your MigrantHub business account. You are now able to login to the application.';
      SendEmail.sendEmail(receiverEmail, subject, message);

      return Promise.resolve('Business user has been created.');
    }
    throw new ServerError('There was an error creating business user.', 400, errors);
  },

  async createAdmin(parsedAdminUserObject) {
    const adminUserObject = parsedAdminUserObject;
    const errors = await AdminAccountValidator.adminAccountValidator(adminUserObject);

    if (errors === '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(adminUserObject.password, salt);
      adminUserObject.password = hash;

      await AdminRepository.createAdmin(adminUserObject);

      const receiverEmail = adminUserObject.email;
      const subject = 'MigrantHub: Account Confirmation';
      const message = 'You have successfully created your MigrantHub admin account. You may login once you have been authorized.';
      SendEmail.sendEmail(receiverEmail, subject, message);

      return Promise.resolve('Admin user has been created.');
    }
    throw new ServerError('There was an error creating admin user.', 400, errors);
  },

  async getUser(userEmail) {
    return UserRepository.getUser(userEmail);
  },

  async forgotPassword(userEmail) {
    const userExists = await UserRepository.getUser(userEmail);

    if (!userExists || userExists.userType !== 'local') {
      throw new ServerError('User does not exist.', 400, `User value: ${userEmail}`);
    }

    const passwordToken = crypto.randomBytes(20).toString('hex');
    const updatePasswordToken = {
      resetPasswordToken: passwordToken,
      resetPasswordExpiry: Date.now() + 360000,
    };

    const receiverEmail = userEmail;
    const subject = 'MigrantHub reset your password';
    const message = `Verification code: ${passwordToken}`;

    SendEmail.sendEmail(receiverEmail, subject, message);

    return UserRepository.update(userEmail, updatePasswordToken);
  },

  async resetPassword(userEmail, userPassword, token) {
    const userExists = await UserRepository.getUser(userEmail);

    if (userExists.resetPasswordToken !== token || userExists.resetPasswordExpiry < Date.now()) {
      throw new ServerError('Invalid reset password request.', 400, 'Token has expired or invalid');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);
    const updatePassword = {
      localAuthentication: {
        password: hash,
      },
    };

    return UserRepository.update(userEmail, updatePassword);
  },
};
