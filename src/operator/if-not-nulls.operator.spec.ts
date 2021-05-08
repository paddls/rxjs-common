import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { ifNotNulls } from './if-not-nulls.operator';

describe('ifNotNulls', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should not filter values`, () => {
    testScheduler.run(({expectObservable, cold}: RunHelpers) => {
      const sourceOne$: Observable<any> = cold('(a|)', {
        a: 1
      });
      const sourceTwo$: Observable<any> = cold('(b|)', {
        b: 2
      });

      expectObservable(forkJoin([sourceOne$, sourceTwo$]).pipe(
        ifNotNulls()
      )).toBe('(c|)', {c: [1, 2]});
    });
  });

  it(`should filter values when at least one is null`, () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const sourceOne$: Observable<any> = hot('abc', {
        a: null,
        b: 1,
        c: 2
      });
      const sourceTwo$: Observable<any> = hot('abc', {
        a: 3,
        b: undefined,
        c: 4
      });

      expectObservable(combineLatest([sourceOne$, sourceTwo$]).pipe(
        ifNotNulls()
      )).toBe('-de', {d: [1, 3], e: [2, 4]});
    });
  });
});
