#  Validate Arguments
## Overview
**Validate Arguments** lets developers employ defensive programming techniques in their **Node.js** applications. Since Javascript provides dynamic typing it is often possible to generate errors that are difficult to debug by providing one or more methods with incorrect or missing arguments. **Validate Arguments** allows you to test for type/existence of method arguments before they can cause problems deeper down the stack.

Note - this is just one way to develop using Javascript and some developers prefer to shift the responsibility caller rather than enforce type within each method. As with anything it comes down to personal preference.

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
 	- **Numbers**, including optional range
 	- **Objects**, including optional required parameters
 	- **RegExps**
 	- **Strings**, including optional RegEx match or list matching
 	- **Variants**, allows for checking one or more of the above

 - Provide default values for arguments that is safe to use with ```0``` and ```false```

## Installation

	$ npm install qa-validate-arguments

## Examples

Begin by referencing the module:

```javascript
var Validate = require("qa-validate-arguments");
```

Once you have reference you can type-check your arguments within functions:

```javascript
function doSomeWork(someArray, someBoolean, someBuffer, someFunction) {
	Validate.assertArray(someArray);
	Validate.assertBoolean(someBoolean);
	Validate.assertBuffer(someBuffer, 200); // requires a minimum for 200 bytes
	Validate.assertFunction( someFunction );
	Validate.assertString(someString, /(^\d{5}$)/); // Validate against the regular expression.

    // Safely do some work.
}

function doSomeWork(someClass, someNumber, someObject, someString) {
	Validate.assertFunction(someFunction);
	Validate.assertClass(SomeClass);
	Validate.assertNumber(someNumber, 1, 10); // validates a number within range from 1 to 10.
	Validate.assertObject(someObject, "property1", "property2"); // Validates an object and the supplied properties.
	Validate.assertString(someString, /(^\d{5}$)/); // Validate against the regular expression.

    // Safely do some work.

}

function doSomeWork(someDate, someError, someRegExp) {
	Validate.assertDate(someDate);
	Validate.assertError(someError);
	Validate.assertRegExp(someRegExp);

	// Safely do some work.
}
```
It also works with variants. send it the value and and a list of asserts to use in the validation.
```javascript
function doSomeWork(someVariant) {
	Validate.assertVariant(someVariant, Validate.isArray, Validate.isString);

	// Safely do some work
    if (Validate.isString(someVariant)) {
    	// It's a string
    } else if(Validate.isArray(someVariant)) {
    	// It's an array.
    }
}
```
You can implement variable function arity as well:
```javascript
function doSomeWork(job, settings, callback) {
	Validate.assertInstance(job, Job);
  	if (Validate.isFunction(settings)) {
		callback = settings;
		settings = {};
    }
	Validate.assertObject(settings);
	Validate.assertFunction(callback);

  // Safe to do some work
}
```

NOTE - when an argument fails a type-check Validate Arguments throws either a TypeError or a RangeError as appropriate.

Set argument defaults before validation:

```javascript
function doSomeWork(someArray, someBoolean) {
	someArray = Validate.setDefault(someArray, []);
	someBoolean = Validate.setDefault(someArray, false);
    
	Validate.isArray(someArray);
	Validate.isBoolean(someBoolean);
}
```

## License

Copyright (c) 2014 Apple Inc. All rights reserved.

