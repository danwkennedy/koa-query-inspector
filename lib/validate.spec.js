'use strict';

const validate = require('./validate');
const assert = require('chai').assert;
const sinon = require('sinon');

describe('Validate', () => {

  describe('configuration', () => {
    it('returns a generator', () => {
      let middleware = validate({});
      assert.isTrue(middleware.constructor.name === 'GeneratorFunction');
    });
  });

  describe('middleware', () => {

    it('passes through if everything is valid', () => {
      let context = {
        req: {
          query: {
            id: 123
          }
        }
      };

      let rules = {
        id: { type: 'number', optional: false }
      };

      let middleware = validate(rules).apply(context);

      assert.doesNotThrow(() => { middleware.next(); });
    });

    it('throws a 400 if the query is invalid', () => {
      let spy = sinon.spy();
      let context = {
        req: {
          query: {
          }
        },
        throw: spy
      };

      let rules = {
        id: { type: 'number', optional: false }
      };

      let middleware = validate(rules).apply(context);

      middleware.next(() => {});

      assert.isTrue(spy.calledWith(400, 'Invalid query string parameters'));
    });

    it('calls onError instead of the default error', () => {
      let spy = sinon.spy();
      let context = {
        req: {
          query: {
          }
        }
      };

      let rules = {
        id: { type: 'number', optional: false }
      };

      let middleware = validate(rules, spy).apply(context);

      middleware.next(() => {});

      assert.isTrue(spy.calledWith([
        {
          code: null,
          message: 'is missing and not optional',
          property: '@.id'
        }
      ]));
    });

  });

});
