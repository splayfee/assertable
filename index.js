"use strict";

/**
 * @fileOverview qa-validate-arguments utility functions
 * @author <a href="mailto:david@edium.com">dlatour</a>
 * @version 1.00.00
 */

var util = require("util");

// Populate the class2type map
var class2type = {};
"Array Boolean Date Error Function Number Object RegExp String".split(" ").forEach(
    function(name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
 });


var Validate = {};
module.exports = Validate;


/**
 * Safer way to determine the actual type of a value.
 * @param {*} value The value to test.
 * @returns {String} A string value indicating the type.
 * @private
 */
function _getType(value) {
    return class2type[Object.prototype.toString.call(value)];
}

/**
 * This method parses the value into the appropriate output.
 * @param {*} value The value to test.
 * @returns {String}
 * @private
 */
function _parseValue(value) {
  return util.inspect(value);
}

/**
 * Returns true if the value is an array, otherwise returns false.
 * @param {*} value The value to test.
 * @returns {Boolean}
 */
Validate.isArray = function(value) {
  return (Array.isArray(value));
};

/**
 * Returns true if the value is a boolean, otherwise returns false.
 * @param {*} value The value to test.
 * @returns {Boolean}
 */
Validate.isBoolean = function(value) {
  return (_getType(value) === "boolean");
};

/**
 * Returns true if the value is a buffer, otherwise returns false.
 * @param {*} value The value to test.
 * @returns {Boolean}
 */
Validate.isBuffer = function(value) {
  return (Buffer.isBuffer(value));
};

/**
 * Returns true if the value is a date, otherwise returns false.
 * @param {*} value The value to test.
 * @returns {Boolean}
 */
Validate.isDate = function(value) {
  return (_getType(value) === "date");
};

/**
 * Returns true if the value is defined, otherwise returns false.
 * @param {*} value The value to test.
 * @returns {Boolean}
 */
Validate.isDefined = function(value) {
  return (value !== null && value !== undefined);
};

/**
 * Returns true if the value is an error, otherwise returns false.
 * @param {*} value The value to test.
 * @returns {Boolean}
 */
Validate.isError = function(value) {
  return (_getType(value) === "error");
};

/**
 * Returns true if the value is a function, otherwise returns false.
 * @param {*} value The value to test.
 * @returns {Boolean}
 */
Validate.isFunction = function(value) {
  return (_getType(value) === "function");
};

/**
 * Returns true if the value is a number, otherwise returns false.
 * @param {*} value The value to test.
 * @returns {Boolean}
 */
Validate.isNumber = function(value) {
  return (_getType(value) === "number");
};

/**
 * Returns true if the value is an object, otherwise returns false.
 * @param {*} value The value to test.
 * @returns {Boolean}
 */
Validate.isObject = function(value) {
  return (_getType(value) === "object");
};

/**
 * Returns true if the value is a RegExp, otherwise returns false.
 * @param {*} value The value to test.
 * @returns {Boolean}
 */
Validate.isRegExp = function(value) {
  return (_getType(value) === "regexp");
};

/**
 * Returns true if the value is a string, otherwise returns false.
 * @param {*} value The value to test.
 * @returns {Boolean}
 */
Validate.isString = function(value) {
  return (_getType(value) === "string");
};

/**
 * Asserts that the value is an array.
 * @param {Array} value The value to test.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 */
Validate.assertArray = function (value, allowNullOrUndefined) {

  if (allowNullOrUndefined && !Validate.isDefined(value)) {
    return;
  }

  var error;
  if (!Array.isArray(value)) {
    error = new TypeError("AssertArray: value '" + _parseValue(value) + "' is not an array");
    throw error;
  }
};

/**
 * Asserts that the value is boolean.
 * @param {Boolean} value The value to test.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 */
Validate.assertBoolean = function (value, allowNullOrUndefined) {

  if (allowNullOrUndefined && !Validate.isDefined(value)) {
    return;
  }

  var error;
  if (_getType(value) !== "boolean") {
    error = new TypeError("AssertBoolean: value '" + _parseValue(value) + "' is not a boolean");
    throw error;
  }
};

/**
 * Asserts that the value is a buffer.
 * @param {Buffer} value The value to test.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 * @param {Number} [length] The required length of the buffer, This value is optional.
 */
Validate.assertBuffer = function (value, allowNullOrUndefined, length) {

  if (Validate.isNumber(allowNullOrUndefined)) {
    length = allowNullOrUndefined;
    allowNullOrUndefined = undefined;
  }

  if (allowNullOrUndefined && !Validate.isDefined(value)) {
    return;
  }

  var error;

  length = Validate.setDefault(length, 0);

  if (!Buffer.isBuffer(value)) {
    error = new TypeError("AssertBuffer: value '" + _parseValue(value) + "' is not a buffer");
    throw error;
  } else if (length > 0 && value.length !== length) {
    error = new RangeError("AssertBuffer: buffer length is out of range");
    throw error;
  }
};

/**
 * Asserts that the value is a date.
 * @param {Date} value The value to test.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 */
Validate.assertDate = function (value, allowNullOrUndefined) {

  if (allowNullOrUndefined && !Validate.isDefined(value)) {
    return;
  }

  var error;
  if (_getType(value) !== "date") {
      error = new TypeError("AssertBuffer: value '" + _parseValue(value) + "' is not a date");
      throw error;
  }
};

/**
 * Asserts that the value is is defined.
 * @param {*} value The value to test.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 */
Validate.assertDefined = function (value, allowNullOrUndefined) {

  if (allowNullOrUndefined && !Validate.isDefined(value)) {
    return;
  }

  var error;
  if (value === null || value === undefined) {
    error = new TypeError("AssertDefined: value is not defined");
    throw error;
  }
};

/**
 * Asserts that the value is an error.
 * @param {Error} value The value to test.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 */
Validate.assertError = function (value, allowNullOrUndefined) {

  if (allowNullOrUndefined && !Validate.isDefined(value)) {
    return;
  }

  var error;
    if (_getType(value) !== "error") {
        error = new TypeError("AssertError: value '" + _parseValue(value) + "' is not an Error");
        throw error;
    }
};

/**
 * Asserts that the value is a function.
 * @param {Function} value The value to test.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 */
Validate.assertFunction = function (value, allowNullOrUndefined) {

  if (allowNullOrUndefined && !Validate.isDefined(value)) {
    return;
  }

  var error;
  if (!value || _getType(value) !== "function") {
    error = new TypeError("AssertFunction: value '" + _parseValue(value) + "' is not a function");
    throw error;
  }
};

/**
 * Asserts that the value is an instance.
 * @param {Object} value The value to test.
 * @param {Function} constructorFunction A constructor function.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 */
Validate.assertInstance = function (value, constructorFunction, allowNullOrUndefined) {

  if (allowNullOrUndefined && !Validate.isDefined(value)) {
    return;
  }

  var error;
  if (!(value instanceof constructorFunction)) {
    error = new TypeError("AssertInstance: value is not an instance of '" + constructorFunction.name + "'");
    throw error;
  }
};

/**
 * Asserts that the value is a number; the value is optionally range-checked (inclusive).
 * @param {Number} value The value to test.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 */
Validate.assertNumber = function (value, allowNullOrUndefined) {

  if (allowNullOrUndefined && !Validate.isDefined(value)) {
    return;
  }

  var error;
  if (_getType(value) !== "number") {
    error = new TypeError("AssertNumber: value '" + _parseValue(value) + "' is not a number");
    throw error;
  }
};

/**
 * Asserts that the value is an object; value is optionally property name checked.
 * @param {Object} value The value to test.
 * @param {...String} [requiredProperties] A list of property names that <b>must</b> be defined in <code>value</code>.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 */
Validate.assertObject = function (value, allowNullOrUndefined, requiredProperties) {

  if (Validate.isBoolean(allowNullOrUndefined)) {
    if (allowNullOrUndefined && !Validate.isDefined(value)) {
      return;
    }
  }

  var error;
  if (!value || _getType(value) !== "object") {
    error = new TypeError("AssertObject: value '" + _parseValue(value) + "' is not an object");
    throw error;
  } else if (arguments.length > 1) {
    Array.prototype.slice.call(arguments, 1).forEach(function (p) {
      if (value[p] === undefined) {
        error = new TypeError("AssertObject: value '" + _parseValue(value) + "' is missing required properties");
        throw error;
      }
    });
  }
};

/**
 * Asserts that the value is is a RegExp.
 * @param {RegExp} value The value to test.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 */
Validate.assertRegExp = function (value, allowNullOrUndefined) {

  if (allowNullOrUndefined && !Validate.isDefined(value)) {
    return;
  }

  var error;
  if (_getType(value) !== "regexp") {
      error = new TypeError("AssertRegExp: value '" + _parseValue(value) + "' is not a RegExp");
      throw error;
  }
};

/**
 * Asserts that the value is a string; value is optionally value-checked.
 * @param {String} value The value to test.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 * @param {Number} [length] The required length of the buffer, This value is optional.
 */
Validate.assertString = function (value, allowNullOrUndefined, length) {

  if (Validate.isNumber(allowNullOrUndefined)) {
    length = allowNullOrUndefined;
    allowNullOrUndefined = undefined;
  }

  if (allowNullOrUndefined && !Validate.isDefined(value)) {
    return;
  }

  length = Validate.setDefault(length, 0);

  var error;
  if (_getType(value) !== "string") {
    error = new TypeError("AssertString: value '" + _parseValue(value) + "' is not a string");
    throw error;
  } else if (length > 0 && value.length !== length) {
    error = new RangeError("AssertString: string length is out of range");
    throw error;
  }
};

/**
 * Asserts that the value is a variant.
 * @param {*} value The value to test.
 * @param {Boolean} [allowNullOrUndefined] Flag that instructs the system to allow null and undefined values.
 * @param {...Function} assertFunctions arguments One or more assert functions.
 */
Validate.assertVariant = function(value, allowNullOrUndefined, assertFunctions) {

  if (Validate.isBoolean(allowNullOrUndefined)) {
    if (allowNullOrUndefined && !Validate.isDefined(value)) {
      return;
    }
  }

  var passedOneCheck = false;
  var checks = Array.prototype.slice.call(arguments, 1);
  var errorMessage = "";

  checks.forEach( function(assert) {
    try {
      assert(value);
      passedOneCheck = true;
    } catch (e) {
      errorMessage += e.message + ". ";
    }
  });

  if ( !passedOneCheck ) {
    throw new TypeError(errorMessage);
  }

};

/**
 * Returns the <code>defValue</code> if value is <i>null</i> or <i>undefined</i>; else, returns <code>value</code>.
 * This is a useful substitute for the idiom <code>value = value || defValue</code> when <code>value</code> is permitted to be 0, false, etc.
 * @param {*} value The value to test for <i>null</i> or <i>undefined</i>.
 * @param {*} defValue The default value to return if value is not set.
 * @returns {*}
 */
Validate.setDefault = function (value, defValue) {
  return value !== null && value !== undefined ? value : defValue;
};