const lib = require('../');

describe(`Entry`, () => {

  test(`Exposes a sanitize function`, () => {
    expect(lib.sanitize).toBeInstanceOf(Function);
  });

  test(`Exposes a validate function`, () => {
    expect(lib.validate).toBeInstanceOf(Function);
  });
});
