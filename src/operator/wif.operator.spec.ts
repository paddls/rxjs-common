import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import {from, Observable, of} from 'rxjs';
import { wif } from './wif.operator';

describe('wif', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should return through function 'Less than or equal', 'Less than or equal', 'Greater than'`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<string> = from([1, 2, 3]).pipe(
        wif(
          (value: number) => value > 2,
          () => 'Greater than',
          () => 'Less than or equal'
        )
      );
      expectObservable(source$).toBe('(bba|)', {a: 'Greater than', b: 'Less than or equal'});
    });
  });

  it(`should return through function 1, 2, 'Greater than'`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<string> = from([1, 2, 3]).pipe(
        wif(
          (value: number) => value > 2,
          () => 'Greater than'
        )
      );
      expectObservable(source$).toBe('(bca|)', {a: 'Greater than', b: 1, c: 2});
    });
  });

  it(`should directly return 'Less than or equal', 'Less than or equal', 'Greater than'`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<string> = from([1, 2, 3]).pipe(
        wif(
          (value: number) => value > 2,
            'Greater than',
            'Less than or equal'
        )
      );
      expectObservable(source$).toBe('(bba|)', {a: 'Greater than', b: 'Less than or equal'});
    });
  });

  it(`should return observable 'Less than or equal', 'Less than or equal', 'Greater than'`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<string> = from([1, 2, 3]).pipe(
        wif(
          (value: number) => value > 2,
            of('Greater than'),
            of('Less than or equal')
        )
      );
      expectObservable(source$).toBe('(bba|)', {a: 'Greater than', b: 'Less than or equal'});
    });
  });

  it(`should return through function observable 'Less than or equal', 'Less than or equal', 'Greater than'`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<string> = from([1, 2, 3]).pipe(
        wif(
          (value: number) => value > 2,
            () => of('Greater than'),
            () => of('Less than or equal')
        )
      );
      expectObservable(source$).toBe('(bba|)', {a: 'Greater than', b: 'Less than or equal'});
    });
  });
});
