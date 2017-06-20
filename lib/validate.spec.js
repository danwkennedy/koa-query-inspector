const validate = require('./validate');

describe('Validate', () => {

  describe('configuration', () => {
    test('returns a generator', () => {
      expect(validate({})).toBeInstanceOf(Function);
    });
  });

  describe('middleware', () => {

    test('passes through if everything is valid', async () => {
      let context = {
        parameters: {
          id: 123
        },
        throw: jest.fn()
      };

      let rules = {
        id: { type: 'number', optional: false }
      };

      await validate(rules)(context, () => { });
      expect(context.throw).not.toHaveBeenCalled();
    });

    test('throws a 400 if the query is invalid', async () => {
      let context = {
        parameters: {
        },
        throw: jest.fn()
      };

      let rules = {
        id: { type: 'number', optional: false }
      };

      await validate(rules)(context, () => { });
      expect(context.throw).toHaveBeenCalledWith(400, 'Invalid query parameters', [{ code: null, message: 'is missing and not optional', property: '@.id', reason: 'optional' }]);
    });

    test('calls onError instead of the default error', async () => {
      let spy = jest.fn();
      let context = {
        parameters: {
        }
      };

      let rules = {
        id: { type: 'number', optional: false }
      };
      await validate(rules, spy)(context, () => { });
      expect(spy).toHaveBeenCalledWith([{ code: null, message: 'is missing and not optional', property: '@.id', reason: 'optional' }], { parameters: {} });
    });

  });

});
