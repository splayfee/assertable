"use strict";

var chai = require("chai");
var expect = chai.expect;

var Validate = require("../index");


describe("Validate", function () {

  describe("#isArray", function () {
    it("returns true", function () {
      expect(Validate.isArray([])).to.eql(true);
    });
    it("returns true", function () {
      expect(Validate.isArray(new Array())).to.eql(true);
    });
    it("returns false", function () {
      expect(Validate.isArray("test")).to.eql(false);
    });
  });

  describe("#isBoolean", function () {
    it("returns true", function () {
      expect(Validate.isBoolean(true)).to.eql(true);
    });
    it("returns true", function () {
      expect(Validate.isBoolean(new Boolean(true))).to.eql(true);
    });
    it("returns false", function () {
      expect(Validate.isBoolean("test")).to.eql(false);
    });
  });

  describe("#isBuffer", function () {
    it("returns true", function () {
      expect(Validate.isBuffer(new Buffer(100))).to.eql(true);
    });
    it("returns false", function () {
      expect(Validate.isBuffer("test")).to.eql(false);
    });
  });

  describe("#isDate", function () {
    it("returns true", function () {
      expect(Validate.isDate(new Date())).to.eql(true);
    });
    it("returns false", function () {
      expect(Validate.isDate("test")).to.eql(false);
    });
  });

  describe("#isDefined", function () {
    it("returns true", function () {
      expect(Validate.isDefined({})).to.eql(true);
    });
    it("returns false", function () {
      expect(Validate.isDefined(null)).to.eql(false);
    });
    it("returns false", function () {
      expect(Validate.isDefined(undefined)).to.eql(false);
    });
  });

  describe("#isError", function () {
    it("returns true", function () {
      expect(Validate.isError(new Error())).to.eql(true);
    });
    it("returns false", function () {
      expect(Validate.isError("test")).to.eql(false);
    });
  });

  describe("#isFunction", function () {
    it("returns true", function () {
      expect(Validate.isFunction(function(){})).to.eql(true);
    });
    it("returns false", function () {
      expect(Validate.isFunction("test")).to.eql(false);
    });
  });

  describe("#isNumber", function () {
    it("returns true", function () {
      expect(Validate.isNumber(123)).to.eql(true);
    });
    it("returns true", function () {
      expect(Validate.isNumber(new Number(123))).to.eql(true);
    });
    it("returns false", function () {
      expect(Validate.isNumber("test")).to.eql(false);
    });
  });

  describe("#isObject", function () {
    it("returns true", function () {
      expect(Validate.isObject({})).to.eql(true);
    });
    it("returns true", function () {
      expect(Validate.isObject(new Object())).to.eql(true);
    });
    it("returns false", function () {
      expect(Validate.isObject("test")).to.eql(false);
    });
  });

  describe("#isRegExp", function () {
    it("returns true", function () {
      expect(Validate.isRegExp(new RegExp())).to.eql(true);
    });
    it("returns false", function () {
      expect(Validate.isRegExp("test")).to.eql(false);
    });
  });

  describe("#isString", function () {
    it("returns true", function () {
      expect(Validate.isString("123")).to.eql(true);
    });
    it("returns true", function () {
      expect(Validate.isString(new String("123"))).to.eql(true);
    });
    it("returns false", function () {
      expect(Validate.isString(123)).to.eql(false);
    });
  });

  describe("#assertArray()", function () {
    it("does not throw an error", function () {

      var data = [1, 2, 3];

      expect(function () {
          Validate.assertArray(data);
      }).not.to.throw();

    });

  });

  describe("#assertArray()", function () {
    it("throws an error", function () {

      var data = "testing123";

      expect(function () {
          Validate.assertArray(data);
      }).to.throw();

    });

  });

  describe("#assertArray()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.assertArray(null);
      }).to.throw();

    });

  });

    describe("#assertBoolean()", function () {
        it("does not throw an error", function () {

            var data = new Boolean(true);

            expect(function () {
                Validate.assertBoolean(data);
            }).not.to.throw();

        });

    });

    describe("#assertBoolean()", function () {
    it("does not throw an error", function () {

      var data = true;

      expect(function () {
        Validate.assertBoolean(data);
      }).not.to.throw();

    });

  });

  describe("#assertBoolean()", function () {
    it("does not throw an error", function () {

      var data = false;

      expect(function () {
        Validate.assertBoolean(data);
      }).not.to.throw();

    });

  });

  describe("#assertBoolean()", function () {
    it("throws an error", function () {

      var data = 0;

      expect(function () {
        Validate.assertArray(data);
      }).to.throw();

    });

  });

  describe("#assertBoolean()", function () {
    it("throws an error", function () {

      var data = 1;

      expect(function () {
        Validate.assertArray(data);
      }).to.throw();

    });

  });

  describe("#assertBoolean()", function () {
    it("throws an error", function () {

      var data = "true";

      expect(function () {
        Validate.assertArray(data);
      }).to.throw();

    });

  });

  describe("#assertBoolean()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.assertBoolean(null);
      }).to.throw();

    });

  });

  describe("#assertBuffer()", function () {
    it("does not throw an error", function () {

      var data = new Buffer(23);
      data.fill(25, 0, 22);

      expect(function () {
        Validate.assertBuffer(data);
      }).not.to.throw();

    });

  });

  describe("#assertBuffer()", function () {
    it("does not throw an error", function () {

      var data = new Buffer(55);
      data.fill(25, 0, 54);

      expect(function () {
        Validate.assertBuffer(data, 55);
      }).not.to.throw();

    });

  });

  describe("#assertBuffer()", function () {
    it("throws an error", function () {

      var data = "testing123";

      expect(function () {
        Validate.assertBuffer(data);
      }).to.throw();

    });

  });

  describe("#assertBuffer()", function () {
    it("throws an error due to size", function () {

      var data = new Buffer(55);
      data.fill(25, 0, 54);

      expect(function () {
        Validate.assertBuffer(data, 100);
      }).to.throw();

    });

  });

  describe("#assertBuffer()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.assertBuffer(null);
      }).to.throw();

    });

  });

  describe("#assertDate()", function () {
    it("does not throw an error", function () {

      var data = new Date();

      expect(function () {
        Validate.assertDate(data);
      }).not.to.throw();

    });

  });

  describe("#assertDate()", function () {
    it("throws an error", function () {

      var data = "1/2/2014";

      expect(function () {
        Validate.assertDate(data);
      }).to.throw();

    });

  });

  describe("#assertDate()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.assertDate(null);
      }).to.throw();

    });

  });

  describe("#assertDefined()", function () {
    it("does not throw an error", function () {

      var data = "testing123";

      expect(function () {
        Validate.assertDefined(data);
      }).not.to.throw();

    });

  });

  describe("#assertDefined()", function () {
    it("throws an error", function () {

      expect(function () {
        Validate.assertDefined(undefined);
      }).to.throw();

    });

  });

  describe("#assertDefined()", function () {
    it("throws an error", function () {

      var data = null;

      expect(function () {
        Validate.assertDefined(data);
      }).to.throw();

    });

  });

  describe("#assertError()", function () {
    it("does not throw an error", function () {

      var data = new Error("testing123");

      expect(function () {
        Validate.assertError(data);
      }).not.to.throw();

    });

  });

  describe("#assertError()", function () {
    it("throws an error", function () {

      var data = "error:testing123";

      expect(function () {
        Validate.assertError(data);
      }).to.throw();

    });

  });

  describe("#assertError()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.assertError(null);
      }).to.throw();

    });

  });

  describe("#assertFunction()", function () {
    it("does not throw an error", function () {

      var data = function () {
      };

      expect(function () {
        Validate.assertFunction(data);
      }).not.to.throw();

    });

  });

  describe("#assertFunction()", function () {
    it("throws an error", function () {

      var data = "testing123";

      expect(function () {
        Validate.assertFunction(data);
      }).to.throw();

    });

  });

  describe("#assertFunction()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.assertFunction(null);
      }).to.throw();

    });

  });

  describe("#assertInstance()", function () {
    it("does not throw an error", function () {

      var data = new Date();

      expect(function () {
        Validate.assertInstance(data, Date);
      }).not.to.throw();

    });

  });

  describe("#assertInstance()", function () {
    it("throws an error", function () {

      var data = "testing123";

      expect(function () {
        Validate.assertInstance(data, Date);
      }).to.throw();

    });

  });

  describe("#assertInstance()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.assertInstance(null, Date);
      }).to.throw();

    });

  });

    describe("#assertNumber()", function () {
        it("does not throw an error", function () {

            var data = new Number(123);

            expect(function () {
                Validate.assertNumber(data);
            }).not.to.throw();

        });

    });

    describe("#assertNumber()", function () {
    it("does not throw an error", function () {

      var data = 123;

      expect(function () {
        Validate.assertNumber(data);
      }).not.to.throw();

    });

  });

  describe("#assertNumber()", function () {
    it("does not throw an error within range", function () {

      var data = 10;

      expect(function () {
        Validate.assertNumber(data, -100, 20);
      }).not.to.throw();

    });

  });

  describe("#assertNumber()", function () {
    it("throws an error", function () {

      var data = "123";

      expect(function () {
        Validate.assertNumber(data);
      }).to.throw();

    });

  });

  describe("#assertNumber()", function () {
    it("throws an error out of range high", function () {

      var data = 11;

      expect(function () {
        Validate.assertNumber(data, 1, 10);
      }).to.throw();

    });

  });

  describe("#assertNumber()", function () {
    it("throws an error out of range low", function () {

      var data = 0;

      expect(function () {
        Validate.assertNumber(data, 1, 10);
      }).to.throw();

    });

  });

  describe("#assertNumber()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.assertNumber(null);
      }).to.throw();

    });

  });

    describe("#assertObject()", function () {
        it("does not throw an error", function () {

            var data = new Object();
            data.name = "David";
            data.age = 45;

            expect(function () {
                Validate.assertObject(data);
            }).not.to.throw();

        });

    });

    describe("#assertObject()", function () {
    it("does not throw an error", function () {

      var data = {name: "David", age: 45};

      expect(function () {
        Validate.assertObject(data);
      }).not.to.throw();

    });

  });

  describe("#assertObject()", function () {
    it("does not throw an error because properties exist", function () {

      var data = {name: "David", age: 45};

      expect(function () {
        Validate.assertObject(data, "name", "age");
      }).not.to.throw();

    });

  });

  describe("#assertObject()", function () {
    it("throws an error", function () {

      var data = "testing123";
      expect(function () {
        Validate.assertObject(data);
      }).to.throw();

    });

  });

  describe("#assertObject()", function () {
    it("throws an error due to missing property", function () {

      var data = {name: "David", age: 45};

      expect(function () {
        Validate.assertObject(data, "birthday");
      }).to.throw();

    });

  });

  describe("#assertObject()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.assertObject(null);
      }).to.throw();

    });

  });

  describe("#assertRegExp()", function () {
    it("does not throw an error", function () {

      var data = new RegExp("/d5");

      expect(function () {
        Validate.assertRegExp(data);
      }).not.to.throw();

    });

  });

  describe("#assertRegExp()", function () {
    it("throws an error", function () {

      var data = "/d5";

      expect(function () {
        Validate.assertRegExp(data);
      }).to.throw();

    });

  });

  describe("#assertRegExp()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.assertRegExp(null);
      }).to.throw();

    });

  });

  describe("#assertString()", function () {
    it("does not throw an error", function () {

      var data = "1000";

      expect(function () {
        Validate.assertString(data);
      }).not.to.throw();

    });

  });

    describe("#assertString()", function () {
        it("does not throw an error due to string match", function () {

            var data = new String("testing123");

            expect(function () {
                Validate.assertString(data, "testing123");
            }).not.to.throw();

        });

    });

    describe("#assertString()", function () {
    it("does not throw an error due to string match", function () {

      var data = "testing123";

      expect(function () {
        Validate.assertString(data, "testing123");
      }).not.to.throw();

    });

  });

  describe("#assertString()", function () {
    it("throws an error", function () {

      var data = 1000;

      expect(function () {
        Validate.assertString(data);
      }).to.throw();

    });

  });

  describe("#assertString()", function () {
    it("throws an error due to no string match", function () {

      var data = "testing123";

      expect(function () {
        Validate.assertString(data, "testing456");
      }).to.throw();

    });

  });

  describe("#assertString()", function () {
    it("throws an error due to RegEx mismatch", function () {

      var data = "fdifi";

      expect(function () {
        Validate.assertString(data, new RegExp("/(^d{5}$)/"));
      }).to.throw();

    });

  });

  describe("#assertString()", function () {
    it("does not throw an error due to RegEx match", function () {

      var data = "12345";

      expect(function () {
        Validate.assertString(data, /(^\d{5}$)/);
      }).not.to.throw();

    });

  });

  describe("#assertString()", function () {
    it("throws an error on null", function () {

      expect(function () {
        Validate.assertString(null);
      }).to.throw();

    });

  });

  describe("#assertVariant()", function () {
    it("throws an error on incorrect", function () {

      expect(function () {
        Validate.assertVariant("testing123", Validate.assertString, Validate.assertArray);
      }).to.not.throw();

      expect(function () {
        Validate.assertVariant(["testing123"], Validate.assertString, Validate.assertArray);
      }).to.not.throw();

      expect(function () {
        Validate.assertVariant(123, Validate.assertString, Validate.assertArray);
      }).to.throw();

    });

  });

});
