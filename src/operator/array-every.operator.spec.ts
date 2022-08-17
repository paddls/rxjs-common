import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable, of } from 'rxjs';
import { arrayEvery } from './array-every.operator';

describe('arrayEvery', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should return true if all elements match predicate`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<boolean> = of([1, 2, 3, 4, 5]).pipe(
        arrayEvery((input: number) => input > 0)
      );
      expectObservable(source$).toBe('(a|)', {a: true});
    });
  });

  it(`should return false if not all elements match predicate`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<boolean> = of([1, 2, 3, -1, 4, 5]).pipe(
        arrayEvery((input: number) => input > 0)
      );
      expectObservable(source$).toBe('(a|)', {a: false});
    });
  });
});
