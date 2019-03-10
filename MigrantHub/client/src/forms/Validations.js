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
  get login() {
    return this.email.concat(this.password);
  },
  get migrant_signup_step1() {
    const rule = this.email
      .concat(this.passwordSignup)
      .concat(this.firstName)
      .concat(this.lastName);
    return rule;
  },
  get migrant_signup_step2() {
    const rule = this.age
      .concat(this.gender)
      .concat(this.nationality)
      .concat(this.relationshipStatus)
      .concat(this.status);
    return rule;
  },
  get migrant_signup_step3() {
    const rule = this.educationLevel
      .concat(this.jobStatus)
      .concat(this.settlingLocation)
      .concat(this.joiningReason);
    return rule;
  },
};

export default rules;
