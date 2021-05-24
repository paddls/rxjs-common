import { onError } from './on-error.operator';
import { TestScheduler } from 'rxjs/testing';
import { Observable, of } from 'rxjs';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';

describe('onError', () => {

  let testScheduler: TestScheduler;

  class A {
  }

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should handle when error match', () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const source$: Observable<any> = hot('a#', {a: 1}, new A()).pipe(
        onError(A, () => {
          return of(2);
        }),
      );

      expectObservable(source$).toBe('a(b|)', {
        a: 1,
        b: 2
      });
    });
  });


  it('should not handle when error mismatch', () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const source$: Observable<any> = hot('a#', {a: 1}, 'some error').pipe(
        onError(A, () => {
          return of(2);
        }),
      );

      expectObservable(source$).toBe('a#', {
        a: 1
      }, 'some error');
    });
  });
});
