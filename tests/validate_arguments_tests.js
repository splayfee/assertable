"use strict";

var expect = require("expect.js");

var Validate = require("../index");


describe("Validate", function () {

  describe("#isArray()", function () {
    it("does not throw an error", function () {

      var data = [1, 2, 3];

      expect(function () {
          Validate.isArray(data);
      }).not.to.throwError();

    });

  });

  describe("#isArray()", function () {
    it("throws an error", function () {

      var data = "testing123";

      expect(function () {
          Validate.isArray(data);
      }).to.throwError();

    });

  });

  describe("#isArray()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.isArray(null);
      }).to.throwError();

    });

  });

    describe("#isBoolean()", function () {
        it("does not throw an error", function () {

            var data = new Boolean(true);

            expect(function () {
                Validate.isBoolean(data);
            }).not.to.throwError();

        });

    });

    describe("#isBoolean()", function () {
    it("does not throw an error", function () {

      var data = true;

      expect(function () {
        Validate.isBoolean(data);
      }).not.to.throwError();

    });

  });

  describe("#isBoolean()", function () {
    it("does not throw an error", function () {

      var data = false;

      expect(function () {
        Validate.isBoolean(data);
      }).not.to.throwError();

    });

  });

  describe("#isBoolean()", function () {
    it("throws an error", function () {

      var data = 0;

      expect(function () {
        Validate.isArray(data);
      }).to.throwError();

    });

  });

  describe("#isBoolean()", function () {
    it("throws an error", function () {

      var data = 1;

      expect(function () {
        Validate.isArray(data);
      }).to.throwError();

    });

  });

  describe("#isBoolean()", function () {
    it("throws an error", function () {

      var data = "true";

      expect(function () {
        Validate.isArray(data);
      }).to.throwError();

    });

  });

  describe("#isBoolean()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.isBoolean(null);
      }).to.throwError();

    });

  });

  describe("#isBuffer()", function () {
    it("does not throw an error", function () {

      var data = new Buffer(23);
      data.fill(25, 0, 22);

      expect(function () {
        Validate.isBuffer(data);
      }).not.to.throwError();

    });

  });

  describe("#isBuffer()", function () {
    it("does not throw an error", function () {

      var data = new Buffer(55);
      data.fill(25, 0, 54);

      expect(function () {
        Validate.isBuffer(data, 55);
      }).not.to.throwError();

    });

  });

  describe("#isBuffer()", function () {
    it("throws an error", function () {

      var data = "testing123";

      expect(function () {
        Validate.isBuffer(data);
      }).to.throwError();

    });

  });

  describe("#isBuffer()", function () {
    it("throws an error due to size", function () {

      var data = new Buffer(55);
      data.fill(25, 0, 54);

      expect(function () {
        Validate.isBuffer(data, 100);
      }).to.throwError();

    });

  });

  describe("#isBuffer()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.isBuffer(null);
      }).to.throwError();

    });

  });

  describe("#isDate()", function () {
    it("does not throw an error", function () {

      var data = new Date();

      expect(function () {
        Validate.isDate(data);
      }).not.to.throwError();

    });

  });

  describe("#isDate()", function () {
    it("throws an error", function () {

      var data = "1/2/2014";

      expect(function () {
        Validate.isDate(data);
      }).to.throwError();

    });

  });

  describe("#isDate()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.isDate(null);
      }).to.throwError();

    });

  });

  describe("#isDefined()", function () {
    it("does not throw an error", function () {

      var data = "testing123";

      expect(function () {
        Validate.isDefined(data);
      }).not.to.throwError();

    });

  });

  describe("#isDefined()", function () {
    it("throws an error", function () {

      expect(function () {
        Validate.isDefined(undefined);
      }).to.throwError();

    });

  });

  describe("#isDefined()", function () {
    it("throws an error", function () {

      var data = null;

      expect(function () {
        Validate.isDefined(data);
      }).to.throwError();

    });

  });

  describe("#isError()", function () {
    it("does not throw an error", function () {

      var data = new Error("testing123");

      expect(function () {
        Validate.isError(data);
      }).not.to.throwError();

    });

  });

  describe("#isError()", function () {
    it("throws an error", function () {

      var data = "error:testing123";

      expect(function () {
        Validate.isError(data);
      }).to.throwError();

    });

  });

  describe("#isError()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.isError(null);
      }).to.throwError();

    });

  });

  describe("#isFunction()", function () {
    it("does not throw an error", function () {

      var data = function () {
      };

      expect(function () {
        Validate.isFunction(data);
      }).not.to.throwError();

    });

  });

  describe("#isFunction()", function () {
    it("throws an error", function () {

      var data = "testing123";

      expect(function () {
        Validate.isFunction(data);
      }).to.throwError();

    });

  });

  describe("#isFunction()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.isFunction(null);
      }).to.throwError();

    });

  });

  describe("#isInstance()", function () {
    it("does not throw an error", function () {

      var data = new Date();

      expect(function () {
        Validate.isInstance(data, Date);
      }).not.to.throwError();

    });

  });

  describe("#isInstance()", function () {
    it("throws an error", function () {

      var data = "testing123";

      expect(function () {
        Validate.isInstance(data, Date);
      }).to.throwError();

    });

  });

  describe("#isInstance()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.isInstance(null, Date);
      }).to.throwError();

    });

  });

    describe("#isNumber()", function () {
        it("does not throw an error", function () {

            var data = new Number(123);

            expect(function () {
                Validate.isNumber(data);
            }).not.to.throwError();

        });

    });

    describe("#isNumber()", function () {
    it("does not throw an error", function () {

      var data = 123;

      expect(function () {
        Validate.isNumber(data);
      }).not.to.throwError();

    });

  });

  describe("#isNumber()", function () {
    it("does not throw an error within range", function () {

      var data = 10;

      expect(function () {
        Validate.isNumber(data, -100, 20);
      }).not.to.throwError();

    });

  });

  describe("#isNumber()", function () {
    it("throws an error", function () {

      var data = "123";

      expect(function () {
        Validate.isNumber(data);
      }).to.throwError();

    });

  });

  describe("#isNumber()", function () {
    it("throws an error out of range high", function () {

      var data = 11;

      expect(function () {
        Validate.isNumber(data, 1, 10);
      }).to.throwError();

    });

  });

  describe("#isNumber()", function () {
    it("throws an error out of range low", function () {

      var data = 0;

      expect(function () {
        Validate.isNumber(data, 1, 10);
      }).to.throwError();

    });

  });

  describe("#isNumber()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.isNumber(null);
      }).to.throwError();

    });

  });

    describe("#isObject()", function () {
        it("does not throw an error", function () {

            var data = new Object();
            data.name = "David";
            data.age = 45;

            expect(function () {
                Validate.isObject(data);
            }).not.to.throwError();

        });

    });

    describe("#isObject()", function () {
    it("does not throw an error", function () {

      var data = {name: "David", age: 45};

      expect(function () {
        Validate.isObject(data);
      }).not.to.throwError();

    });

  });

  describe("#isObject()", function () {
    it("does not throw an error because properties exist", function () {

      var data = {name: "David", age: 45};

      expect(function () {
        Validate.isObject(data, "name", "age");
      }).not.to.throwError();

    });

  });

  describe("#isObject()", function () {
    it("throws an error", function () {

      var data = "testing123";
      expect(function () {
        Validate.isObject(data);
      }).to.throwError();

    });

  });

  describe("#isObject()", function () {
    it("throws an error due to missing property", function () {

      var data = {name: "David", age: 45};

      expect(function () {
        Validate.isObject(data, "birthday");
      }).to.throwError();

    });

  });

  describe("#isObject()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.isObject(null);
      }).to.throwError();

    });

  });

  describe("#isRegExp()", function () {
    it("does not throw an error", function () {

      var data = new RegExp("/d5");

      expect(function () {
        Validate.isRegExp(data);
      }).not.to.throwError();

    });

  });

  describe("#isRegExp()", function () {
    it("throws an error", function () {

      var data = "/d5";

      expect(function () {
        Validate.isRegExp(data);
      }).to.throwError();

    });

  });

  describe("#isRegExp()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.isRegExp(null);
      }).to.throwError();

    });

  });

  describe("#isString()", function () {
    it("does not throw an error", function () {

      var data = "1000";

      expect(function () {
        Validate.isString(data);
      }).not.to.throwError();

    });

  });

    describe("#isString()", function () {
        it("does not throw an error due to string match", function () {

            var data = new String("testing123");

            expect(function () {
                Validate.isString(data, "testing123");
            }).not.to.throwError();

        });

    });

    describe("#isString()", function () {
    it("does not throw an error due to string match", function () {

      var data = "testing123";

      expect(function () {
        Validate.isString(data, "testing123");
      }).not.to.throwError();

    });

  });

  describe("#isString()", function () {
    it("throws an error", function () {

      var data = 1000;

      expect(function () {
        Validate.isString(data);
      }).to.throwError();

    });

  });

  describe("#isString()", function () {
    it("throws an error due to no string match", function () {

      var data = "testing123";

      expect(function () {
        Validate.isString(data, "testing456");
      }).to.throwError();

    });

  });

  describe("#isString()", function () {
    it("throws an error due to RegEx mismatch", function () {

      var data = "fdifi";

      expect(function () {
        Validate.isString(data, new RegExp("/(^d{5}$)/"));
      }).to.throwError();

    });

  });

  describe("#isString()", function () {
    it("does not throw an error due to RegEx match", function () {

      var data = "12345";

      expect(function () {
        Validate.isString(data, /(^\d{5}$)/);
      }).not.to.throwError();

    });

  });

  describe("#isString()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.isString(null);
      }).to.throwError();

    });

  });

});
