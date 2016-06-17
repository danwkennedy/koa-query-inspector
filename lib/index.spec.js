const lib = require('../');
const assert = require('chai').assert;

describe(`Entry`, () => {

  it(`Exposes a sanitize function`, () => {
    assert.property(lib, 'sanitize');
    assert.isFunction(lib.sanitize);
  });

  it(`Exposes a validate function`, () => {
    assert.property(lib, 'validate');
    assert.isFunction(lib.validate);
  });
});
