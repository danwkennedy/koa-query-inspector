const inspector = require('schema-inspector');

module.exports = function querySanitizer(rules, strict) {

  let sanitizationRules = {
    type: 'object',
    strict: strict || false,
    properties: rules
  };

  return function *sanitize(next) {
    this.req.query = inspector.sanitize(sanitizationRules, this.query).data;
    yield next;
  };
};
