import {get, isFunction} from './util';

describe('Util', () => {

  describe('#isFunction', () => {

    it('should return true if is function', () => {
      expect(isFunction(function () {})).toBe(true);
    });

    it('should return true if is anonymous function', () => {
      expect(isFunction(() => {})).toBe(true);
    });

    it('should return true if is class', () => {
      expect(isFunction(class NotAFunction {})).toBe(true);
    });

    it('should return true if is regex', () => {
      expect(isFunction(/abc/)).toBe(false);
    });
  });

  describe('#get', () => {

    const simpleObject = { a: { b: 2 } }
    const complexObject = { a: [{ bar: { c: 3 } }] }
    const falsyObject = { a: null, b: undefined, c: 0 }

    it('a.b', () => {
      expect(get(simpleObject, 'a.b')).toEqual(2);
    });

    it('a[0].bar.c', () => {
      expect(get(complexObject, 'a[0].bar.c')).toEqual(3);
    });

    it('[\'a\', \'0\', \'bar\', \'c\']', () => {
      expect(get(complexObject, ['a', '0', 'bar', 'c'])).toEqual(3);
    });

    it('a.bar.c with default', () => {
      expect(get(simpleObject, 'a.bar.c', 'default')).toEqual('default');
    });

    it('a.bar.c with default', () => {
      expect(get(complexObject, 'a.bar.c', 'default')).toEqual('default');
    });

    it('null', () => {
      expect(get(complexObject, null)).toEqual(undefined);
    });

    it('a with default', () => {
      expect(get(falsyObject, 'a', 'default')).toEqual(null);
    });

    it('b with default', () => {
      expect(get(falsyObject, 'b', 'default')).toEqual('default');
    });

    it('c with default', () => {
      expect(get(falsyObject, 'c', 'default')).toEqual(0);
    });
  });
})
