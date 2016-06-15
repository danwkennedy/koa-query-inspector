const inspector = require('schema-inspector');
const _ = require('lodash');

module.exports = function queryValidator(rules, onError, strict) {
  let validationRules = {
    type: 'object',
    strict: strict || false,
    properties: rules
  };

  onError = onError || throwValidationError;

  return function *sanitize(next) {
    let query = _.clone(this.query);

    let validation = inspector.validate(validationRules, query);

    if(!validation.valid) {
      onError.call(this, validation.error);
    }

    yield next;
  };
};

function throwValidationError(errors) {
  this.throw(400, 'Invalid query string parameters', errors);
}
