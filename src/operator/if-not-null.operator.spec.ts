import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { ifNotNull } from './if-not-null.operator';

describe('ifNotNull', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should return a, 0, ", {}, []', () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const values: any = {
        a: 'a',
        b: 0,
        c: null,
        d: undefined,
        e: '',
        f: {},
        g: [],
        h: true,
        i: false
      };
      const source$: Observable<any> = hot('abcdefghi', values).pipe(
        ifNotNull(),
      );

      expectObservable(source$).toBe('ab--efghi', values);
    });
  });

  it('should return { a: 0 }, { a: " }, []', () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const values: any = {
        a: {length: 0},
        b: {length: ''},
        c: [],
        d: {length: null},
        e: {},
      };
      const source$: Observable<any> = hot('abcde', values).pipe(
        ifNotNull('length'),
      );

      expectObservable(source$).toBe('abc--', values);
    });
  });

  it('should return { a: { b: 0 } }', () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const values: any = {
        a: {a: {b: 0}},
        b: {a: {b: null}},
      };
      const source$: Observable<any> = hot('ab', values).pipe(
        ifNotNull('a.b'),
      );

      expectObservable(source$).toBe('a-', values);
    });
  });
});
