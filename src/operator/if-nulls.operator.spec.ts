import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { ifNulls } from './if-nulls.operator';

describe('ifNulls', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should not filter values`, () => {
    testScheduler.run(({expectObservable, cold}: RunHelpers) => {
      const sourceOne$: Observable<any> = cold('(a|)', {
        a: null
      });
      const sourceTwo$: Observable<any> = cold('(b|)', {
        b: undefined
      });

      expectObservable(forkJoin([sourceOne$, sourceTwo$]).pipe(
        ifNulls()
      )).toBe('(c|)', {c: [null, undefined]});
    });
  });

  it(`should filter values when at least one is not null`, () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const sourceOne$: Observable<any> = hot('abc', {
        a: 1,
        b: null
      });
      const sourceTwo$: Observable<any> = hot('abc', {
        a: undefined,
        b: 2
      });

      expectObservable(combineLatest([sourceOne$, sourceTwo$]).pipe(
        ifNulls()
      )).toBe('-de', {d: [null, undefined], e: [undefined, undefined]});
    });
  });
});
