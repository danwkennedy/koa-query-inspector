const inspector = require('schema-inspector');

/**
  @name OnError
  @function
  @param {Object[]} errors A list of error objects
*/

/**
 * queryValidator - Creates query validator middleware
 *
 * @param  {object}     rules   The validation rules
 * @param  {OnError}   onError  The function to call if a validation error is found
 * @param  {boolean}    strict  Whether to throw if extra fields are found
 * @return {function*}          The validation middleware
 */
module.exports = function queryValidator(rules, onError = throwValidationError, { strict = false, field = 'parameters' } = {}) {
  let validationRules = {
    type: 'object',
    strict: strict || false,
    properties: rules
  };

  /**
   * anonymous function - description
   *
   * @param  {type} next description
   * @return {type}      description
   */
  return async (ctx, next) => {
    let validation = inspector.validate(validationRules, ctx[field]);

    if (!validation.valid) {
      return onError(validation.error, ctx);
    }

    return next();
  };
};


/**
 * throwValidationError - Throws a generic validation error
 *
 * @param  {object[]}  errors A list of validation errors to throw
 * @return {undefined}
 */
function throwValidationError(errors, ctx) {
  ctx.throw(400, 'Invalid query parameters', errors);
}
