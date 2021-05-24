import { Observable } from 'rxjs';
import { RunHelpers, TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { refreshOn } from './refresh-on.operator';

describe('refreshOn', () => {

  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should emit source$'s result at each triggers$ emission`, () => {
    testScheduler.run(({expectObservable, hot, cold}: RunHelpers) => {
      const source$: Observable<any> = cold('a|', {a: 1});
      const firstTrigger$: Observable<any> = hot('--b', {b: 2});
      const secondTrigger$: Observable<any> = hot('----c', {c: 3});

      expectObservable(source$.pipe(
        refreshOn(firstTrigger$, secondTrigger$)
      )).toBe('a-a-a', {
        a: 1,
      });
    });
  });

  it(`should only emit source$'s when no triggers`, () => {
    testScheduler.run(({expectObservable, cold}: RunHelpers) => {
      const source$: Observable<any> = cold('a-a-a', {a: 1});

      expectObservable(source$.pipe(
        refreshOn()
      )).toBe('a-a-a', {
        a: 1,
      });
    });
  });

  it(`should only emit source$'s when triggers never emits`, () => {
    testScheduler.run(({expectObservable, hot, cold}: RunHelpers) => {
      const source$: Observable<any> = cold('a|', {a: 1});
      const trigger$: Observable<any> = hot('-------', {b: 2});

      expectObservable(source$.pipe(
        refreshOn(trigger$)
      )).toBe('a', {
        a: 1,
      });
    });
  });
});
