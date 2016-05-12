# koa-query-inspector

Middleware for KOA that sanitizes and validates query string parameters. This package uses the execellent [schema-inspector](https://www.npmjs.com/package/schema-inspector) package to do the actual santization/validation.

## Installation

`npm install --save koa-query-inspector`

## Usage

The package is a namespace that provides two function calls:
```
{
  sanitize: function(sanitizationRules),
  validate: function(validationRules, [onError])
}
```

### Sanitization

Call sanitize with an object defining the sanitization rules as specified by [schema-inspector](https://github.com/Atinux/schema-inspector#sanitization).

For example:
```
const sanitize = require('koa-query-inspector').sanitize;
const KOA = require('koa');

const app = new KOA();

const rules = {
  id: { type: 'number', optional: false, def: 123}
};

app.use(sanitize(rules));
app.get(*function() {
  console.log(this.query); // will default to the number 123
});

```

### Validation

Call validate with an object defining the validation rules as specified by [schema-inspector](https://github.com/Atinux/schema-inspector#sanitization). By default, any validation errors will by thrown with a status of 400. To override this behavior, simply specify an onError handler that accepts a list of errors.

For example:
```
const validate = require('koa-query-inspector').validate;
const Koa = require('koa');

const app = new Koa();

const rules = {
  id: { type: 'number', optional: false }
};

app.use(validate(rules, onError));
app.get(*function() {
  console.log(this.query);
});

function onError(errors) {
  console.log(errors); // errors will contain an error for each validation rule that failed
}
```

## Testing

In a dev environment, call `npm test` to run unit tests. For coverage, run `npm run coverage` to generate code coverage in the `./build/coverage` folder.
