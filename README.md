# Assertable

## Overview
**Assertable** is an assertion library that allows developers to employ defensive programming techniques in their **Node.js** applications. Since Javascript provides dynamic typing it is often possible to generate errors that are difficult to debug by providing one or more methods with incorrect or missing arguments. **Assertable** allows you to use assertions to test for type/existence of method arguments before they can cause problems deeper down the stack.

This version is a modernized runtime assertion helper for Node.js 20+, browsers, and mobile runtimes.

## What changed

- Removed Gulp
- Replaced the legacy test suite with Vitest.
- Switched the package manager declaration to pnpm.
- Added ESM, CommonJS, and browser-friendly UMD entry points.
- Removed the Node `util.inspect()` dependency so the package can run in browsers and mobile webviews.
- Kept the public API and method names intact.
- Rewrote the export as a modern class with static methods.

## Features
 - Assert or test for the type of an argument or variable including:
 	- **Arrays**
 	- **Booleans**
 	- **Buffers**, including optional length
 	- **Defined**, checks for null and undefined
 	- **Dates**
 	- **Errors**
 	- **Functions**
 	- **Instances**
 	- **Numbers**
 	- **Objects**, including optional required parameters
 	- **RegExps**
 	- **Strings**, including optional length
 	- **Variants**, allows for checking one or more of the above

 - Optionally, each test may pass an assert if the value is null or undefined.
 - Provide default values for arguments that is safe to use with ```0``` and ```false```

## Install

```bash
pnpm add assertable
```

## Usage

### CommonJS

```js
const Assert = require('assertable');

Assert.string('hello');
Assert.object({ id: 1 }, 'id');
```

### ESM

```js
import Assert from 'assertable';

Assert.number(123);
Assert.variant('123', Assert.string, Assert.number);
```

### Browser

```html
<script src="./dist/assertable.umd.js"></script>
<script>
  Assertable.object({ id: 1 }, 'id');
</script>
```

## Examples

Begin by referencing the module (see above):

```javascript
import Assert from 'assertable';
```

Once you have reference you can type-check your arguments within functions:

```javascript
function doSomeWork(someArray, someBoolean, someBuffer, someFunction) {
	Assert.array(someArray, true); // May be null or undefined.
	Assert.boolean(someBoolean);
	Assert.buffer(someBuffer, 200); // requires a minimum for 200 bytes
	Assert.method( someFunction );
	Assert.string(someString, /(^\d{5}$)/); // Validate against the regular expression.

    // Safely do some work.
}

function doSomeWork(someClass, someNumber, someObject, someString) {
	Assert.method(someClass);
	Assert.number(someNumber);
	Assert.object(someObject, "property1", "property2"); // Validates an object and the supplied properties.
	Assert.string(someString, 10) // Validates a string of length 10

    // Safely do some work.

}

function doSomeWork(someDate, someError, someRegExp) {
	Assert.date(someDate);
	Assert.error(someError);
	Assert.regExp(someRegExp);

	// Safely do some work.
}
```
It also works with variants. send it the value and and a list of asserts to use in the validation.
```javascript
function doSomeWork(someVariant) {
	Assert.variant(someVariant, Assert.isArray, Assert.isString);

	// Safely do some work
    if (Assert.isString(someVariant)) {
    	// It's a string
    } else if(Assert.isArray(someVariant)) {
    	// It's an array.
    }
}
```
You can implement variable function arity as well:
```javascript
function doSomeWork(job, settings, callback) {
	Assert.instance(job, Job);
  	if (Assert.isFunction(settings)) {
		callback = settings;
		settings = {};
    }
	Assert.object(settings);
	Assert.method(callback);

  // Safe to do some work
}
```

NOTE - when an argument fails a type-check Validate Arguments throws either a TypeError or a RangeError as appropriate.

Set argument defaults before validation:

```javascript
function doSomeWork(someArray, someBoolean) {
	someArray = Assert.setDefault(someArray, []);
	someBoolean = Assert.setDefault(someArray, false);
    
	Assert.isArray(someArray);
	Assert.isBoolean(someBoolean);
}
```
There is no need to instantiate the class.

## Notes on buffer compatibility

In Node.js, `Assert.isBuffer()` and `Assert.buffer()` support `Buffer`.

In browsers and mobile runtimes, those same APIs support `ArrayBuffer` and typed-array views such as `Uint8Array`, which are the closest cross-platform equivalent.

## Test

```bash
pnpm install
pnpm test
```

## License

MIT
