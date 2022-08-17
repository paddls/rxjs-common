import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable, of } from 'rxjs';
import { arraySort } from './array-sort.operator';

describe('arraySort', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should return sorted source's array`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<number[]> = of([3, 1, 2]).pipe(
        arraySort((a: number, b: number) => a - b)
      );
      expectObservable(source$).toBe('(a|)', {a: [1, 2, 3]});
    });
  });
});
