import { Observable } from 'rxjs';
import { onAny } from './on-any.operator';
import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import DoneCallback = jest.DoneCallback;

describe('onAny', () => {

  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should return handle on error', (done: DoneCallback) => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const source$: Observable<any> = hot('#').pipe(
        onAny(() => {
          done();
        }),
      );

      expectObservable(source$).toBe('#');
    });
  });

  it('should return handle on empty', (done: DoneCallback) => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const source$: Observable<any> = hot('|').pipe(
        onAny(() => {
          done();
        }),
      );

      expectObservable(source$).toBe('|');
    });
  });

  it('should return handle on value', (done: DoneCallback) => {
    let handle: number = 0;
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const values: any = {
        a: 0,
        b: 1,
      };
      const source$: Observable<any> = hot('ab|', values).pipe(
        onAny(() => {
          if (++handle === 2) {
            done();
          }
        }),
      );

      expectObservable(source$).toBe('ab|', values);
    });
  });
});
