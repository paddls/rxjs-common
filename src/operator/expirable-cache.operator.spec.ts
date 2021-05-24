import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { tap } from 'rxjs/operators';
import { expirableCache } from './expirable-cache.operator';
import { interval, Observable } from 'rxjs';

describe('expirableCache', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should ', () => {
    testScheduler.run(({flush}: RunHelpers) => {
      let counter: number = 0;

      const source$: Observable<number> = interval(1000).pipe(
        tap(() => counter++),
        expirableCache(1001)
      );

      source$.subscribe();
      source$.subscribe();
      source$.subscribe();

      flush();

      source$.subscribe();

      expect(counter).toEqual(1);
    });
  });

});
