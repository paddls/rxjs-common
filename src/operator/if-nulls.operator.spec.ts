import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { combineLatest, Observable } from 'rxjs';
import { ifNulls } from './if-nulls.operator';

describe('ifNulls', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should filter values when one is null`, () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const sourceOne$: Observable<any> = hot('a', {
        a: null,
      });
      const sourceTwo$: Observable<any> = hot('a', {
        a: 3,
      });

      expectObservable(combineLatest([sourceOne$, sourceTwo$]).pipe(
        ifNulls()
      )).toBe('');
    });
  });

  it(`should filter values when one is undefined`, () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const sourceOne$: Observable<any> = hot('a', {
        a: undefined,
      });
      const sourceTwo$: Observable<any> = hot('a', {
        a: 3,
      });

      expectObservable(combineLatest([sourceOne$, sourceTwo$]).pipe(
        ifNulls()
      )).toBe('');
    });
  });

  it(`should not filter values when both are undefined`, () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const sourceOne$: Observable<any> = hot('a', {
        a: undefined,
      });
      const sourceTwo$: Observable<any> = hot('a', {
        a: undefined,
      });

      expectObservable(combineLatest([sourceOne$, sourceTwo$]).pipe(
        ifNulls()
      )).toBe('a', {a: [undefined, undefined]});
    });
  });

  it(`should filter values when both are null`, () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const sourceOne$: Observable<any> = hot('a', {
        a: null,
      });
      const sourceTwo$: Observable<any> = hot('a', {
        a: null,
      });

      expectObservable(combineLatest([sourceOne$, sourceTwo$]).pipe(
        ifNulls()
      )).toBe('a', {a: [null, null]});
    });
  });

  it(`should filter values when both are not null`, () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const sourceOne$: Observable<any> = hot('a', {
        a: 1,
      });
      const sourceTwo$: Observable<any> = hot('a', {
        a: 2,
      });

      expectObservable(combineLatest([sourceOne$, sourceTwo$]).pipe(
        ifNulls()
      )).toBe('');
    });
  });
});
