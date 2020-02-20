import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { ifNotNull } from './if-not-null.operator';

describe('ifNotNull', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should return a, 0, ", {}, []', () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const values: any = {
        a: 'a',
        b: 0,
        c: null,
        d: undefined,
        e: '',
        f: {},
        g: [],
        h: true,
        i: false
      };
      const source$: Observable<any> = hot('abcdefghi', values).pipe(
        ifNotNull(),
      );

      expectObservable(source$).toBe('ab--efghi', values);
    });
  });
});
