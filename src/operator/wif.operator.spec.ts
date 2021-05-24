import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { from, Observable } from 'rxjs';
import { wif } from './wif.operator';

describe('wif', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it(`should return 'Less than or equal', 'Less than or equal', 'Greater than'`, () => {
    testScheduler.run(({expectObservable}: RunHelpers) => {

      const source$: Observable<string> = from([1, 2, 3]).pipe(
        wif(
          (value: number) => value > 2,
          () => 'Greater than',
          () => 'Less than or equal'
        )
      );
      expectObservable(source$).toBe('(bba|)', {a: 'Greater than', b: 'Less than or equal'});
    });
  });
});
