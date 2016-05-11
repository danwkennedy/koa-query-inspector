'use strict';

const sanitize = require('./sanitize');
const assert = require('chai').assert;

describe('Sanitize', () => {

  describe('configuration', () => {
    it('returns a generator', () => {
      let middleware = sanitize({});
      assert.isTrue(middleware.constructor.name === 'GeneratorFunction');
    });
  });

  describe('middleware', () => {

    it('sanitizes the query object', () => {
      let date = new Date();
      let context = {
        req: {
          query: {
            from: date.getTime()
          }
        }
      };

      let rules = {
        from: { type: 'date', optional: false },
        page: { type: 'number', optional: false, def: 1}
      };

      let middleware = sanitize(rules).apply(context);

      middleware.next();

      let query = context.req.query;
      assert.property(query, 'from');
      assert.property(query, 'page');
      assert.equal(query.page, 1);
      assert.deepEqual(query.from, date);
    });


  });
});
