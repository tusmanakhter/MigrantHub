import validator from 'validator';

const rules = {
  email: [
    {
      field: 'email',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Email is required',
    },
    {
      field: 'email',
      method: validator.isEmail,
      validWhen: true,
      message: 'Email is not valid',
    },
  ],
  password: [
    {
      field: 'password',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Password is required',
    },
  ],
  get passwordSignup() {
    const additionalRules = [{
      field: 'password',
      method: validator.isLength,
      args: [{ min: 8 }],
      validWhen: true,
      message: 'Password must be 8 characters',
    }];
    return this.password.concat(additionalRules);
  },
  firstName: [
    {
      field: 'firstName',
      method: validator.isEmpty,
      validWhen: false,
      message: 'First name is required',
    },
    {
      field: 'firstName',
      method: validator.isAlpha,
      validWhen: true,
      message: 'First name is not valid',
    },
  ],
  lastName: [
    {
      field: 'lastName',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Last name is required',
    },
    {
      field: 'lastName',
      method: validator.isAlpha,
      validWhen: true,
      message: 'Last name is not valid',
    },
  ],
  age: [
    {
      field: 'age',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Age is required',
    },
    {
      field: 'age',
      method: validator.isInt,
      args: [{ min: 1, max: 100 }],
      validWhen: true,
      message: 'Age is not valid',
    },
  ],
  gender: [
    {
      field: 'gender',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Gender is required',
    },
  ],
  nationality: [
    {
      field: 'nationality',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Nationality is required',
    },
    {
      field: 'nationality',
      method: validator.isAlpha,
      validWhen: true,
      message: 'Nationality is not valid',
    },
  ],
  relationshipStatus: [
    {
      field: 'relationshipStatus',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Relationship status is required',
    },
  ],
  status: [
    {
      field: 'status',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Status is required',
    },
  ],
  educationLevel: [
    {
      field: 'educationLevel',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Education level is required',
    },
  ],
  jobStatus: [
    {
      field: 'jobStatus',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Job status is required',
    },
  ],
  settlingLocation: [
    {
      field: 'settlingLocation',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Settling location is required',
    },
  ],
  joiningReason: [
    {
      field: 'joiningReason',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Joining reason is required',
    },
  ],
  corpId: [
    {
      field: 'corpId',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Corporation Id is required',
    },
    {
      field: 'corpId',
      method: validator.isNumeric,
      validWhen: true,
      message: 'Corporation Id must be a 7 digit number',
    },
  ],
  address: [
    {
      field: 'address',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Address is required',
    },
  ],
  city: [
    {
      field: 'city',
      method: validator.isEmpty,
      validWhen: false,
      message: 'City is required',
    },
    {
      field: 'city',
      method: validator.isAlpha,
      validWhen: true,
      message: 'City is not valid',
    },
  ],
  province: [
    {
      field: 'province',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Province is required',
    },
  ],
  postalCode: [
    {
      field: 'postalCode',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Postal code is required',
    },
    {
      field: 'postalCode',
      method: validator.isLength,
      args: [{ min: 7, max: 7 }],
      validWhen: true,
      message: 'Postal code is not valid',
    },
  ],
  phoneNumber: [
    {
      field: 'phoneNumber',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Phone number is required',
    },
    {
      field: 'phoneNumber',
      method: validator.isLength,
      args: [{ min: 14, max: 14 }],
      validWhen: true,
      message: 'Phone number is not valid',
    },
  ],
  organizationName: [
    {
      field: 'organizationName',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Organization name is required',
    },
  ],
  orgType: [
    {
      field: 'orgType',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Organization type is required',
    },
  ],
  department: [
    {
      field: 'department',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Department name is required',
    },
  ],
  serviceType: [
    {
      field: 'serviceType',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Service type is required',
    },
  ],
  description: [
    {
      field: 'description',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Description is required',
    },
  ],
  get login() {
    return this.email.concat(this.password);
  },
  get migrantSignupStep1() {
    const rule = this.email
      .concat(this.passwordSignup)
      .concat(this.firstName)
      .concat(this.lastName);
    return rule;
  },
  get migrantSignupStep2() {
    const rule = this.age
      .concat(this.gender)
      .concat(this.nationality)
      .concat(this.relationshipStatus)
      .concat(this.status);
    return rule;
  },
  get migrantSignupStep3() {
    const rule = this.educationLevel
      .concat(this.jobStatus)
      .concat(this.settlingLocation)
      .concat(this.joiningReason);
    return rule;
  },
  get migrantSignup() {
    const rule = this.migrantSignupStep1
      .concat(this.migrantSignupStep2)
      .concat(this.migrantSignupStep3);
    return rule;
  },
  get businessSignupStep1() {
    const rule = this.email
      .concat(this.passwordSignup)
      .concat(this.firstName)
      .concat(this.lastName);
    return rule;
  },
  get businessSignupStep2() {
    return this.corpId;
  },
  get businessSignupStep3() {
    const rule = this.address
      .concat(this.city)
      .concat(this.province)
      .concat(this.postalCode)
      .concat(this.phoneNumber);
    return rule;
  },
  get businessSignupStep4() {
    const rule = this.organizationName
      .concat(this.orgType)
      .concat(this.department)
      .concat(this.serviceType)
      .concat(this.description);
    return rule;
  },
  get businessSignup() {
    const rule = this.businessSignupStep1
      .concat(this.businessSignupStep2)
      .concat(this.businessSignupStep3)
      .concat(this.businessSignupStep4);
    return rule;
  },
  get adminSignup() {
    const rule = this.email
      .concat(this.passwordSignup);
    return rule;
  },
};

export default rules;
