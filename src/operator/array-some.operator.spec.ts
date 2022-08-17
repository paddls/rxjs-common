import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable, of } from 'rxjs';
import { arraySome } from './array-some.operator';

describe('arraySome', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should return true if one element matches predicate`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<boolean> = of([1, 2, 3, 4, 5]).pipe(
        arraySome((input: number) => input > 2)
      );
      expectObservable(source$).toBe('(a|)', {a: true});
    });
  });

  it(`should return false if no element matches predicate`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<boolean> = of([1, 2, 3, 4, 5]).pipe(
        arraySome((input: number) => input > 20)
      );
      expectObservable(source$).toBe('(a|)', {a: false});
    });
  });
});
