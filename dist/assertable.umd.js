(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    global.Assertable = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var toString = Object.prototype.toString;
  var class2type = Object.freeze('Array Boolean Date Error Function Number Object RegExp String'.split(' ').reduce(function (map, name) {
    map['[object ' + name + ']'] = name.toLowerCase();
    return map;
  }, {}));

  function getType(value) {
    return class2type[toString.call(value)];
  }

  function parseValue(value) {
    if (typeof value === 'string') {
      return "'" + value + "'";
    }

    try {
      if (typeof globalThis !== 'undefined' && globalThis.JSON) {
        var seen = new WeakSet();
        var json = JSON.stringify(value, function (_key, current) {
          if (typeof current === 'bigint') {
            return String(current) + 'n';
          }
          if (typeof current === 'object' && current !== null) {
            if (seen.has(current)) {
              return '[Circular]';
            }
            seen.add(current);
          }
          return current;
        });

        if (json !== undefined) {
          return json;
        }
      }
    } catch (_error) {}

    try {
      return String(value);
    } catch (_error2) {
      return '[Unserializable value]';
    }
  }

  function hasBuffer() {
    return typeof globalThis !== 'undefined' && typeof globalThis.Buffer !== 'undefined' && typeof globalThis.Buffer.isBuffer === 'function';
  }

  function isBinaryBuffer(value) {
    if (hasBuffer() && globalThis.Buffer.isBuffer(value)) {
      return true;
    }

    if (typeof ArrayBuffer === 'undefined') {
      return false;
    }

    return value instanceof ArrayBuffer || ArrayBuffer.isView(value);
  }

  function getBinaryBufferLength(value) {
    if (value == null) {
      return 0;
    }

    if (typeof value.byteLength === 'number') {
      return value.byteLength;
    }

    if (typeof value.length === 'number') {
      return value.length;
    }

    return 0;
  }

  class Assert {
    static isArray(value) {
      return Array.isArray(value);
    }

    static isBoolean(value) {
      return getType(value) === 'boolean';
    }

    static isBuffer(value) {
      return isBinaryBuffer(value);
    }

    static isDate(value) {
      return getType(value) === 'date';
    }

    static isDefined(value) {
      return value !== null && value !== undefined;
    }

    static isError(value) {
      return getType(value) === 'error';
    }

    static isFunction(value) {
      return getType(value) === 'function';
    }

    static isInstance(value, constructorFunction) {
      return value instanceof constructorFunction;
    }

    static isNumber(value) {
      return getType(value) === 'number';
    }

    static isObject(value) {
      return getType(value) === 'object';
    }

    static isRegExp(value) {
      return getType(value) === 'regexp';
    }

    static isString(value) {
      return getType(value) === 'string';
    }

    static array(value, allowNullOrUndefined) {
      if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }
      if (!Array.isArray(value)) { throw new TypeError("AssertArray: value '" + parseValue(value) + "' is not an array"); }
    }

    static boolean(value, allowNullOrUndefined) {
      if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }
      if (getType(value) !== 'boolean') { throw new TypeError("AssertBoolean: value '" + parseValue(value) + "' is not a boolean"); }
    }

    static buffer(value, allowNullOrUndefined, length) {
      if (Assert.isNumber(allowNullOrUndefined)) {
        length = allowNullOrUndefined;
        allowNullOrUndefined = undefined;
      }

      if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }

      var expectedLength = Assert.setDefault(length, 0);

      if (!isBinaryBuffer(value)) { throw new TypeError("AssertBuffer: value '" + parseValue(value) + "' is not a buffer"); }
      if (expectedLength > 0 && getBinaryBufferLength(value) !== expectedLength) { throw new RangeError('AssertBuffer: buffer length is out of range'); }
    }

    static date(value, allowNullOrUndefined) {
      if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }
      if (getType(value) !== 'date') { throw new TypeError("AssertDate: value '" + parseValue(value) + "' is not a date"); }
    }

    static defined(value, allowNullOrUndefined) {
      if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }
      if (value === null || value === undefined) { throw new TypeError('AssertDefined: value is not defined'); }
    }

    static error(value, allowNullOrUndefined) {
      if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }
      if (getType(value) !== 'error') { throw new TypeError("AssertError: value '" + parseValue(value) + "' is not an Error"); }
    }

    static method(value, allowNullOrUndefined) {
      if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }
      if (!value || getType(value) !== 'function') { throw new TypeError("AssertFunction: value '" + parseValue(value) + "' is not a function"); }
    }

    static instance(value, constructorFunction, allowNullOrUndefined) {
      if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }
      if (!(value instanceof constructorFunction)) { throw new TypeError("AssertInstance: value is not an instance of '" + constructorFunction.name + "'"); }
    }

    static number(value, allowNullOrUndefined) {
      if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }
      if (getType(value) !== 'number') { throw new TypeError("AssertNumber: value '" + parseValue(value) + "' is not a number"); }
    }

    static object(value, allowNullOrUndefined) {
      var properties = Array.prototype.slice.call(arguments, 2);

      if (Assert.isBoolean(allowNullOrUndefined)) {
        if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }
      } else {
        properties = [allowNullOrUndefined].concat(properties).filter(function (property) { return property !== undefined; });
      }

      if (!value || getType(value) !== 'object') { throw new TypeError("AssertObject: value '" + parseValue(value) + "' is not an object"); }

      properties.forEach(function (property) {
        if (value[property] === undefined) { throw new TypeError("AssertObject: value '" + parseValue(value) + "' is missing required properties"); }
      });
    }

    static regExp(value, allowNullOrUndefined) {
      if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }
      if (getType(value) !== 'regexp') { throw new TypeError("AssertRegExp: value '" + parseValue(value) + "' is not a RegExp"); }
    }

    static string(value, allowNullOrUndefined, length) {
      if (Assert.isNumber(allowNullOrUndefined)) {
        length = allowNullOrUndefined;
        allowNullOrUndefined = false;
      }

      if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }

      var expectedLength = Assert.setDefault(length, 0);

      if (getType(value) !== 'string') { throw new TypeError("AssertString: value '" + parseValue(value) + "' is not a string"); }
      if (expectedLength > 0 && value.length !== expectedLength) { throw new RangeError('AssertString: string length is out of range'); }
    }

    static variant(value, allowNullOrUndefined) {
      var checks = Array.prototype.slice.call(arguments, 2);

      if (Assert.isBoolean(allowNullOrUndefined)) {
        if (allowNullOrUndefined && !Assert.isDefined(value)) { return; }
      } else {
        checks = [allowNullOrUndefined].concat(checks).filter(Boolean);
      }

      var passedOneCheck = false;
      var errorMessage = '';

      checks.forEach(function (assert) {
        try {
          assert(value);
          passedOneCheck = true;
        } catch (error) {
          errorMessage += error.message + '. ';
        }
      });

      if (!passedOneCheck) { throw new TypeError(errorMessage); }
    }

    static setDefault(value, defValue) {
      return value !== null && value !== undefined ? value : defValue;
    }
  }

  Object.freeze(Assert);
  return Assert;
});
