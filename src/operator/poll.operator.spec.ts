import { poll } from './poll.operator';
import { Observable } from 'rxjs';
import { RunHelpers, TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { take } from 'rxjs/operators';

describe('poll', () => {

  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should emit sourceObs$\'s result and trigger it again every 10ms interval', () => {
    testScheduler.run(({expectObservable, cold}: RunHelpers) => {
      const source$: Observable<any> = cold('a', {a: 1}).pipe(
        poll(10, true),
        take(3)
      );

      expectObservable(source$).toBe('a 9ms a 9ms (a|)', {
        a: 1,
      });
    });
  });

  it('should emit sourceObs$\'s result and trigger it again every 10ms interval by default', () => {
    testScheduler.run(({expectObservable, cold}: RunHelpers) => {
      const source$: Observable<any> = cold('a', {a: 1}).pipe(
        poll(10),
        take(3)
      );

      expectObservable(source$).toBe('a 9ms a 9ms (a|)', {
        a: 1,
      });
    });
  });

  it('should emit sourceObs$\'s result every 10ms interval', () => {
    testScheduler.run(({expectObservable, cold}: RunHelpers) => {
      const source$: Observable<any> = cold('a', {a: 1}).pipe(
        poll(10, false),
        take(3)
      );

      expectObservable(source$).toBe('10ms a 9ms a 9ms (a|)', {
        a: 1,
      });
    });
  });
});
