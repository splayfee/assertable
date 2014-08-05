"use strict";

/**
 * @fileOverview qa-validate-arguments utility functions
 * @author <a href="mailto:david@edium.com">dlatour</a>
 * @version 1.00.00
 */

var util = require("util");

// Populate the class2type map
var class2type = {};
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(
    function(name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
 });


/**
 * Safer way to determine the actual type of an object.
 * @param object
 * @returns {*}
 */
function getType(object) {
    return class2type[Object.prototype.toString.call(object)];
}

/**
 * This method parses the value into the appropriate output.
 * @param value
 */
function parseValue(value) {
  return util.inspect(value);
}

/**
 * Test if argument is an array.
 * @param {Array} value
 */
module.exports.isArray = function (value) {
  var error;
  if (!Array.isArray(value)) {
    error = new TypeError("Bad Argument - value '" + parseValue(value) + "' is not an array");
    throw error;
  }
};

/**
 * Test if argument is boolean.
 * @param {Boolean} value
 */
module.exports.isBoolean = function (value) {
  var error;
  if (getType(value) !== "boolean") {
    error = new TypeError("Bad Argument - value '" + parseValue(value) + "' is not a boolean");
    throw error;
  }
};

/**
 * Test if argument is a buffer.
 * @param {Buffer} value
 * @param {Number} [length] The required length of the buffer, This value is optional.
 */
module.exports.isBuffer = function (value, length) {
  var error;

  length = module.exports.setDefault(length, 0);

  if (!Buffer.isBuffer(value)) {
    error = new TypeError("Bad Argument - value '" + parseValue(value) + "' is not a buffer");
    throw error;
  } else if (length > 0 && value.length !== length) {
    error = new RangeError("Bad Argument - buffer length is out of range");
    throw error;
  }
};

/**
 * Test if argument is a date.
 * @param {Date} value
 */
module.exports.isDate = function (value) {
    var error;
    if (getType(value) !== "date") {
        error = new TypeError("Bad Argument - value '" + parseValue(value) + "' is not a date");
        throw error;
    }
};

/**
 * Test if argument has a value.
 * @param {*} value
 */
module.exports.isDefined = function (value) {
  var error;
  if (value === null || value === undefined) {
    error = new TypeError("Bad Argument - value is not undefined");
    throw error;
  }
};

/**
 * Test if argument is an error.
 * @param {Error} value
 */
module.exports.isError = function (value) {
    var error;
    if (getType(value) !== "error") {
        error = new TypeError("Bad Argument - value '" + parseValue(value) + "' is not an Error");
        throw error;
    }
};

/**
 * Test if argument is a function.
 * @param {Function} value
 */
module.exports.isFunction = function (value) {
  var error;
  if (!value || getType(value) !== "function") {
    error = new TypeError("Bad Argument - value '" + parseValue(value) + "' is not a function");
    throw error;
  }
};

/**
 * Test if argument is an instance of a given class.
 * @param {Object} instance
 * @param {Function} constructorFunction A constructor function.
 */
module.exports.isInstance = function (instance, constructorFunction) {
  var error;
  if (!(instance instanceof constructorFunction)) {
    error = new TypeError("Bad Argument - value is not an instance of '" + constructorFunction.name + "'");
    throw error;
  }
};

/**
 * Test if argument is a number; the value is optionally range-checked (inclusive).
 * @param {Number} value
 * @param {Number} [low] The lowest acceptable value.
 * @param {Number} [high] The highest acceptable value; if omitted, there is no upper limit.
 */
module.exports.isNumber = function (value, low, high) {
  var error;
  if (getType(value) !== "number") {
    error = new TypeError("Bad Argument - value '" + parseValue(value) + "' is not a number");
    throw error;
  } else if ((low !== undefined && value < low) || (high !== undefined && value > high)) {
    error = new RangeError("Bad Argument - value '" + parseValue(value) + "' is out of range");
    throw error;
  }
};

/**
 * Test if argument is an object; value is optionally property name checked.
 * @param {Object} value
 * @param {...String} [requiredProperties] A list of property names that <b>must</b> be defined in <code>value</code>.
 */
module.exports.isObject = function (value, requiredProperties) {
  var error;
  if (!value || getType(value) !== "object") {
    error = new TypeError("Bad Argument - value '" + parseValue(value) + "' is not an object");
    throw error;
  } else if (arguments.length > 1) {
    Array.prototype.slice.call(arguments, 1).forEach(function (p) {
      if (value[p] === undefined) {
        error = new TypeError("Bad Argument - value '" + parseValue(value) + "' is missing required properties");
        throw error;
      }
    });
  }
};

/**
 * Test if argument is a RegExp.
 * @param {RegExp} value
 */
module.exports.isRegExp = function (value) {
    var error;
    if (getType(value) !== "regexp") {
        error = new TypeError("Bad Argument - value '" + parseValue(value) + "' is not a RegExp");
        throw error;
    }
};

/**
 * Test if argument is a string; value is optionally value-checked.
 * @param {String} value
 * @param {...String|RegExp} [values] <code>value</code> <b>must</b> be one of the listed values or match the regex.
 */
module.exports.isString = function (value, values) {
  var error;
  if (getType(value) !== "string") {
    error = new TypeError("Bad Argument - value '" + parseValue(value) + "' is not a string");
    throw error;
  } else if (values) {
     value = value.toString();
    if (values instanceof RegExp) {
      if (!values.test(value)) {
        error = new TypeError("Bad Argument - value '" + parseValue(value) + "' does not match the Regular Expression");
        throw error;
      }
    } else if (Array.prototype.slice.call(arguments, 1).indexOf(value) === -1) {
      error = new TypeError("Bad Argument - value '" + parseValue(value) + "' does not match supplied list values");
      throw error;
    }
  }

};

/**
 * Returns the <code>defValue</code> if value is <i>null</i> or <i>undefined</i>; else, returns <code>value</code>.
 * This is a useful substitute for the idiom <code>value = value || defValue</code> when <code>value</code> is permitted to be 0, false, etc.
 * @param {*} value The value to test for <i>null</i> or <i>undefined</i>.
 * @param {*} defValue The default value to return if value is not set.
 * @returns {*}
 */
module.exports.setDefault = function (value, defValue) {
  return value !== null && value !== undefined ? value : defValue;
};