import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { delay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { hardCache } from './hard-cache.operator';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';
import DoneCallback = jest.DoneCallback;

describe('hardCache', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should share replay across subscriptions', () => {
    testScheduler.run(({hot, flush, expectSubscriptions}: RunHelpers) => {
      let counter: number = 0;

      const source$: HotObservable<number> = hot('a', {a: 1});

      const cache$: Observable<number> = source$.pipe(
        tap(() => counter++),
        hardCache()
      );

      cache$.subscribe();
      cache$.subscribe();

      flush();

      expect(counter).toEqual(1);
      expectSubscriptions(source$.subscriptions).toBe('^');
    });
  });

  it('should update counter when timer expired', (done: DoneCallback) => {
    testScheduler.run(({hot}: RunHelpers) => {
      let counter: number = 0;

      const source$: Observable<string> = hot('a').pipe(
        tap(() => counter++),
        hardCache(1),
      );

      source$.subscribe();
      source$.pipe(delay(20)).subscribe();
      setTimeout(() => {
        expect(counter).toEqual(2);
        done();
      }, 100);
    });
  });
});
