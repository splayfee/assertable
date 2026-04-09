import { describe, expect, it } from 'vitest';
import Assert from '../index.mjs';

class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
}

describe('Assert class shape', () => {
  it('exports a class-like constructor with static methods', () => {
    expect(typeof Assert).toBe('function');
    expect(Object.prototype.hasOwnProperty.call(Assert, 'string')).toBe(true);
    expect(() => new Assert()).not.toThrow();
    expect(typeof Assert.string).toBe('function');
  });
});

describe('Assert type guards', () => {
  it('detects arrays', () => {
    expect(Assert.isArray([])).toBe(true);
    expect(Assert.isArray(new Array())).toBe(true);
    expect(Assert.isArray('test')).toBe(false);
  });

  it('detects booleans including boxed values', () => {
    expect(Assert.isBoolean(true)).toBe(true);
    expect(Assert.isBoolean(new Boolean(true))).toBe(true);
    expect(Assert.isBoolean('test')).toBe(false);
  });

  it('detects buffers in Node and typed arrays in browsers', () => {
    expect(Assert.isBuffer(new Uint8Array([1, 2, 3]))).toBe(true);
    expect(Assert.isBuffer(new ArrayBuffer(4))).toBe(true);
    expect(Assert.isBuffer('test')).toBe(false);
  });

  it('detects dates, errors, functions, instances, numbers, objects, regexes, and strings', () => {
    expect(Assert.isDate(new Date())).toBe(true);
    expect(Assert.isError(new Error('x'))).toBe(true);
    expect(Assert.isFunction(() => {})).toBe(true);
    expect(Assert.isInstance(new Car('Mazda', '6'), Car)).toBe(true);
    expect(Assert.isNumber(123)).toBe(true);
    expect(Assert.isNumber(new Number(123))).toBe(true);
    expect(Assert.isObject({})).toBe(true);
    expect(Assert.isRegExp(/x/)).toBe(true);
    expect(Assert.isString('123')).toBe(true);
    expect(Assert.isString(new String('123'))).toBe(true);
  });

  it('detects defined values', () => {
    expect(Assert.isDefined({})).toBe(true);
    expect(Assert.isDefined(null)).toBe(false);
    expect(Assert.isDefined(undefined)).toBe(false);
  });
});

describe('Assert validators', () => {
  it('validates arrays', () => {
    expect(() => Assert.array([1, 2, 3])).not.toThrow();
    expect(() => Assert.array('testing123')).toThrow(TypeError);
    expect(() => Assert.array(null)).toThrow(TypeError);
    expect(() => Assert.array(null, true)).not.toThrow();
  });

  it('validates booleans', () => {
    expect(() => Assert.boolean(new Boolean(true))).not.toThrow();
    expect(() => Assert.boolean(true)).not.toThrow();
    expect(() => Assert.boolean(false)).not.toThrow();
    expect(() => Assert.boolean(0)).toThrow(TypeError);
  });

  it('validates binary buffers and length', () => {
    const buffer = new Uint8Array([1, 2, 3]);
    expect(() => Assert.buffer(buffer)).not.toThrow();
    expect(() => Assert.buffer(buffer, 3)).not.toThrow();
    expect(() => Assert.buffer(buffer, false, 2)).toThrow(RangeError);
    expect(() => Assert.buffer('abc')).toThrow(TypeError);
    expect(() => Assert.buffer(undefined, true)).not.toThrow();
  });

  it('validates dates', () => {
    expect(() => Assert.date(new Date())).not.toThrow();
    expect(() => Assert.date('2020-01-01')).toThrow(TypeError);
  });

  it('validates defined values', () => {
    expect(() => Assert.defined(0)).not.toThrow();
    expect(() => Assert.defined(false)).not.toThrow();
    expect(() => Assert.defined(null)).toThrow(TypeError);
    expect(() => Assert.defined(undefined, true)).not.toThrow();
  });

  it('validates errors', () => {
    expect(() => Assert.error(new TypeError('x'))).not.toThrow();
    expect(() => Assert.error({ message: 'x' })).toThrow(TypeError);
  });

  it('validates methods', () => {
    expect(() => Assert.method(function named() {})).not.toThrow();
    expect(() => Assert.method(null, true)).not.toThrow();
    expect(() => Assert.method('nope')).toThrow(TypeError);
  });

  it('validates instances', () => {
    expect(() => Assert.instance(new Car('Mazda', '6'), Car)).not.toThrow();
    expect(() => Assert.instance({ make: 'Mazda', model: '6' }, Car)).toThrow(TypeError);
  });

  it('validates numbers', () => {
    expect(() => Assert.number(123)).not.toThrow();
    expect(() => Assert.number(new Number(123))).not.toThrow();
    expect(() => Assert.number('123')).toThrow(TypeError);
  });

  it('validates objects and required properties', () => {
    expect(() => Assert.object({ a: 1 })).not.toThrow();
    expect(() => Assert.object({ a: 1, b: 2 }, 'a', 'b')).not.toThrow();
    expect(() => Assert.object({ a: 1 }, false, 'a')).not.toThrow();
    expect(() => Assert.object({ a: 1 }, 'b')).toThrow(TypeError);
    expect(() => Assert.object(null, true)).not.toThrow();
  });

  it('validates regular expressions', () => {
    expect(() => Assert.regExp(/test/)).not.toThrow();
    expect(() => Assert.regExp('test')).toThrow(TypeError);
  });

  it('validates strings and length', () => {
    expect(() => Assert.string('abc')).not.toThrow();
    expect(() => Assert.string(new String('abc'))).not.toThrow();
    expect(() => Assert.string('abc', 3)).not.toThrow();
    expect(() => Assert.string('abc', false, 2)).toThrow(RangeError);
    expect(() => Assert.string(123)).toThrow(TypeError);
    expect(() => Assert.string(undefined, true)).not.toThrow();
  });

  it('validates variants', () => {
    expect(() => Assert.variant('abc', Assert.string, Assert.number)).not.toThrow();
    expect(() => Assert.variant(123, Assert.string, Assert.number)).not.toThrow();
    expect(() => Assert.variant(undefined, true, Assert.string, Assert.number)).not.toThrow();
    expect(() => Assert.variant({}, Assert.string, Assert.number)).toThrow(TypeError);
  });

  it('sets default values without clobbering falsey values', () => {
    expect(Assert.setDefault(undefined, 5)).toBe(5);
    expect(Assert.setDefault(null, 5)).toBe(5);
    expect(Assert.setDefault(0, 5)).toBe(0);
    expect(Assert.setDefault(false, true)).toBe(false);
    expect(Assert.setDefault('', 'fallback')).toBe('');
  });
});
