import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable, of } from 'rxjs';
import { arrayMap } from './array-map.operator';

describe('arrayMap', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should return mapped source's array`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<string[]> = of([1, 2, 3]).pipe(
        arrayMap((input: number) => `${ input }`)
      );
      expectObservable(source$).toBe('(a|)', {a: ['1', '2', '3']});
    });
  });

  it(`should return mapped source's array at each emission`, () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {

      const source$: Observable<string[]> = hot('ab', {a: [1, 2, 3], b: [1] }).pipe(
        arrayMap((input: number) => `${ input }`)
      );
      expectObservable(source$).toBe('ab', {a: ['1', '2', '3'], b: ['1']});
    });
  });
});
