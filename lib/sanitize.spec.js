const sanitize = require('./sanitize');

describe('Sanitize', () => {
  describe('configuration', () => {
    test('returns a generator', () => {
      expect(sanitize({})).toBeInstanceOf(Function);
    });
  });

  describe('middleware', () => {

    test('sanitizes the query object', async () => {
      let date = new Date();
      let context = {
        request: {
          query: {
            from: date.getTime()
          }
        }
      };

      let rules = {
        from: { type: 'date', optional: false },
        page: { type: 'number', optional: false, def: 1 }
      };

      await sanitize(rules)(context, () => { });

      let query = context.parameters;
      expect(query).toHaveProperty('from', date);
      expect(query).toHaveProperty('page', 1);
    });
  });
});
