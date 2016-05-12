const inspector = require('schema-inspector');

module.exports = function queryValidator(rules, onError, strict) {
  let validationRules = {
    type: 'object',
    strict: strict || false,
    properties: rules
  };

  onError = onError || throwValidationError;

  return function *sanitize(next) {
    let validation = inspector.validate(validationRules, this.query);

    if(!validation.valid) {
      onError.call(this, validation.error);
    }

    yield next;
  };
};

function throwValidationError(errors) {
  this.throw(400, 'Invalid query string parameters', errors);
}
