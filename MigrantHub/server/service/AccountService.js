const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const BusinessAccountValidator = require('../validators/BusinessAccountValidator');
const MigrantAccountValidator = require('../validators/MigrantAccountValidator');
const AdminAccountValidator = require('../validators/AdminAccountValidator');
const MigrantRepository = require('../repository/MigrantRepository');
const BusinessRepository = require('../repository/BusinessRepository');
const AdminRepository = require('../repository/AdminRepository');
const UserRepository = require('../repository/UserRepository');
const PinnedServiceService = require('../service/PinnedServiceService');
const { ServerError } = require('../errors/ServerError');
const SendEmail = require('../mail/SendEmail');
const { SignupConfirmationEmail } = require('../mail/EmailMessages');
const SavedJobService = require('../service/SavedJobService');
const SavedEventService = require('../service/SavedEventService');

module.exports = {
  async createUser(parsedMigrantUserObject) {
    const migrantUserObject = parsedMigrantUserObject;
    const errors = await MigrantAccountValidator.migrantAccountValidator(migrantUserObject, false);
    const { title, user } = SignupConfirmationEmail;
    const { message } = user;

    if (errors === '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(migrantUserObject.password, salt);
      migrantUserObject.password = hash;

      await MigrantRepository.createUser(migrantUserObject);
      await SavedJobService.createSavedJob(migrantUserObject.email);
      await PinnedServiceService.createPinnedService(migrantUserObject.email);
      await SavedEventService.createSavedEvent(migrantUserObject.email);

      const receiverEmail = migrantUserObject.email;
      SendEmail.sendEmail(receiverEmail, title, message);

      return Promise.resolve('Migrant User has been created.');
    }
    throw new ServerError('There was an error creating migrant user.', 400, errors);
  },

  async createBusiness(parsedBusinessUserObject) {
    const businessUserObject = parsedBusinessUserObject;
    const errors = await BusinessAccountValidator
      .businessAccountValidator(businessUserObject, false);
    const { title, business } = SignupConfirmationEmail;
    const { message } = business;
    if (errors === '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(businessUserObject.password, salt);
      businessUserObject.password = hash;

      await BusinessRepository.createBusiness(businessUserObject);

      const receiverEmail = businessUserObject.email;
      SendEmail.sendEmail(receiverEmail, title, message);

      return Promise.resolve('Business user has been created.');
    }
    throw new ServerError('There was an error creating business user.', 400, errors);
  },

  async createAdmin(parsedAdminUserObject) {
    const adminUserObject = parsedAdminUserObject;
    const errors = await AdminAccountValidator.adminAccountValidator(adminUserObject);
    const { title, admin } = SignupConfirmationEmail;
    const { message } = admin;

    if (errors === '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(adminUserObject.password, salt);
      adminUserObject.password = hash;

      await AdminRepository.createAdmin(adminUserObject);

      const receiverEmail = adminUserObject.email;
      SendEmail.sendEmail(receiverEmail, title, message);

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
    const subject = 'MigrantHub Reset Password/MigrantHub Réinitialiser le mot de passe';
    const message = `French message will follow.<br /><br />Verification code: ${passwordToken} <br /><br /> Code de Vérification: ${passwordToken}`;

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

  async checkUserExists(userEmail) {
    const userExists = await UserRepository.getUser(userEmail);

    if (!userExists || userExists.userType !== 'local') {
      throw new ServerError('User does not exist.', 404, `User value: ${userEmail}`);
    } else {
      return userExists;
    }
  },
};
