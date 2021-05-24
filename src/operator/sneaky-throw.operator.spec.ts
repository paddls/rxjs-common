import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable, of, throwError } from 'rxjs';
import { sneakyThrow } from './sneaky-throw.operator';

describe('sneakyThrow', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should return EMPTY`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {
      const source$: Observable<any> = throwError(new Error('An error')).pipe(
        sneakyThrow()
      );

      expectObservable(source$).toBe('|');
    });
  });

  it(`should return value when no error`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {
      const source$: Observable<any> = of(1).pipe(
        sneakyThrow()
      );

      expectObservable(source$).toBe('(a|)', { a: 1 });
    });
  });
});
