import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { ifTruthy } from './if-truthy.operator';

describe('ifTruthy', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should return a, {}, [], true', () => {
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
        ifTruthy(),
      );

      expectObservable(source$).toBe('a----fgh-', values);
    });
  });
});
