const inspector = require('schema-inspector');


/**
 * querySanitizer - Creates a sanitizer for the query object
 *
 * @param  {object}    rules  The rules to sanitize with
 * @param  {boolean}   strict Whether to sanitize in strict mode
 * @return {function*}        The sanitizer middleware given the rules and options
 */
module.exports = function querySanitizer(rules, { strict = false, field = 'parameters' } = {}) {

  let sanitizationRules = {
    type: 'object',
    strict: strict || false,
    properties: rules
  };


  /**
   * sanitize function - Sanitizes the query object
   *
   * @param  {function}  next Indicates the next middleware can have flow control
   * @return {undefined}
   */
  return async (ctx, next) => {
    ctx[field] = inspector.sanitize(sanitizationRules, Object.assign({}, ctx.request.query, ctx.params)).data;
    return next();
  };
};
