import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { from, Observable } from 'rxjs';
import { toHotArray } from './to-hot-array.operator';

describe('toHotArray', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should return [1], [1, 2], [1, 2, 3]', () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {
      const expectedMarble: string = '(abc|)';
      const expectedValue: any = {a: [1], b: [1, 2], c: [1, 2, 3]};
      const source$: Observable<number> = from([1, 2, 3]).pipe(
        toHotArray()
      );
      expectObservable(source$).toBe(expectedMarble, expectedValue);
    });
  });
});
