import { Observable } from 'rxjs';
import { onAny } from './on-any.operator';
import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

describe('onAny', () => {

  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should return handle on error', () => {
    testScheduler.run(({ expectObservable, hot, flush }: RunHelpers) => {
      const cb: Spy = createSpy();
      const source$: Observable<any> = hot('#').pipe(
        onAny(cb)
      );

      expectObservable(source$).toBe('#');
      flush();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  it('should return handle item then on error', () => {
    testScheduler.run(({ expectObservable, hot, flush }: RunHelpers) => {
      const cb: Spy = createSpy();
      const source$: Observable<any> = hot('a#').pipe(
        onAny(cb)
      );

      expectObservable(source$).toBe('a#');
      flush();
      expect(cb).toHaveBeenCalledTimes(2);
    });
  });

  it('should return handle on empty', () => {
    testScheduler.run(({ expectObservable, hot, flush }: RunHelpers) => {
      const cb: Spy = createSpy();
      const source$: Observable<any> = hot('|').pipe(
        onAny(cb)
      );

      expectObservable(source$).toBe('|');
      flush();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  it('should return handle on value', () => {
    testScheduler.run(({ expectObservable, hot, flush }: RunHelpers) => {
      const cb: Spy = createSpy();
      const source$: Observable<any> = hot('ab|').pipe(
        onAny(cb)
      );

      expectObservable(source$).toBe('ab|');
      flush();
      expect(cb).toHaveBeenCalledTimes(2);
    });
  });
});
