import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { from, Observable, of } from 'rxjs';
import { ifEmpty } from './if-empty.operator';

describe('ifEmpty', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should return 1, 2, 3 cause not empty', () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {
      const expectedMarble: string = '(abc|)';
      const expectedValue: any = {a: 1, b: 2, c: 3};
      const source$: Observable<number> = from([1, 2, 3]).pipe(
        ifEmpty(of(0))
      );
      expectObservable(source$).toBe(expectedMarble, expectedValue);
    });
  });

  it('should return 0 cause empty', () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {
      const expectedMarble: string = '(a|)';
      const expectedValue: any = {a: 0};
      const source$: Observable<number> = from([]).pipe(
        ifEmpty(of(0))
      );
      expectObservable(source$).toBe(expectedMarble, expectedValue);
    });
  });
});
