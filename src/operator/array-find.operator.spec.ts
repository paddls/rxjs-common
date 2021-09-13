import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable, of } from 'rxjs';
import { arrayFind } from './array-find.operator';

describe('arrayFind', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should return undefined if array null`, () => {
    testScheduler.run(({ expectObservable }: RunHelpers) => {

      const source$: Observable<number> = of(null).pipe(
        arrayFind((input: number) => input === 2)
      );
      expectObservable(source$).toBe('(a|)', { a: undefined });
    });
  });

  it(`should return second array element's`, () => {
    testScheduler.run(({ expectObservable }: RunHelpers) => {

      const source$: Observable<number> = of([1, 2, 3, 4, 5]).pipe(
        arrayFind((input: number) => input === 2)
      );
      expectObservable(source$).toBe('(a|)', { a: 2 });
    });
  });

  it(`should return filtered source's array at each emission`, () => {
    testScheduler.run(({ expectObservable, hot }: RunHelpers) => {

      const source$: Observable<number> = hot('ab', { a: [1, 2, 3, 4, 5], b: [0] }).pipe(
        arrayFind((input: number) => input % 2 === 0)
      );
      expectObservable(source$).toBe('ab', { a: 2, b: 0 });
    });
  });
});
