class FormValidator {
  constructor(validations) {
    // validations is an array of validation rules specific to a form
    this.validations = validations;
  }

  async validate(state) {
    // start out assuming valid
    const validation = this.valid();

    for (const rule of this.validations) {
      // if the field hasn't already been marked invalid by an earlier rule
      if (!validation[rule.field].isInvalid) {
        // determine the field value, the method to invoke and optional args from
        // the rule definition
        const fieldValue = state[rule.field].toString();
        const args = rule.args || [];
        const validationMethod = rule.method;

        // call the validator method with the current field value as the first
        // argument and any additional arguments. If the result doesn't match the
        // rule.validWhen property, then modify the validation object for the field
        // and set the isValid field to false
        if (await validationMethod(fieldValue, ...args) !== rule.validWhen) {
          validation[rule.field] = { isInvalid: true, message: rule.message };
          validation.isValid = false;
        }
      }
    }

    return validation;
  }

  valid() {
    const validation = {};

    this.validations.forEach((rule) => {
      validation[rule.field] = { isInvalid: false, message: '' };
    });

    return { isValid: true, ...validation };
  }
}

export default FormValidator;
