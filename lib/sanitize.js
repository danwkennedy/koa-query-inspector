const inspector = require('schema-inspector');

module.exports = function querySanitizer(rules) {

  let sanitizationRules = {
    type: 'object',
    properties: rules
  };

  return function *sanitize(next) {
    this.req.query = inspector.sanitize(sanitizationRules, this.query).data;
    yield next;
  };
};
