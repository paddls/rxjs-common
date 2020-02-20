import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { isEqual } from 'lodash';
import { arrayFilter } from './array-filter.operator';

describe('arrayFilter', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should return [1, 2, 3], [1, 3], [3], [4, 5], [4]', () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const input$: Observable<number[]> = hot('ab-c', {
        a: [],
        b: [1, 2],
        c: [5],
      });

      const source$: Observable<number[]> = hot('a-b', {
        a: [1, 2, 3],
        b: [4, 5]
      }).pipe(
        arrayFilter(input$)
      );

      expectObservable(source$).toBe('abcd', {a: [1, 2, 3], b: [3], c: [4, 5], d: [4]});
    });
  });

  it('should return [{id: 1}, {id: 2}], [{id: 2}]', () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const input$: Observable<any[]> = hot('ab', {
        a: [],
        b: [{id: 1}],
      });

      const source$: Observable<any[]> = hot('a', {
        a: [{id: 1}, {id: 2}],
      }).pipe(
        arrayFilter(input$, 'id')
      );

      expectObservable(source$).toBe('ab', {a: [{id: 1}, {id: 2}], b: [{id: 2}]});
    });
  });

  it('should return [{id: 1}, {id: 2}], [{id: 1}]', () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const input$: Observable<any[]> = hot('ab', {
        a: [],
        b: [{id: 2}],
      });

      const source$: Observable<any[]> = hot('a', {
        a: [{id: 1}, {id: 2}],
      }).pipe(
        arrayFilter(input$, isEqual),
      );

      expectObservable(source$).toBe('ab', {a: [{id: 1}, {id: 2}], b: [{id: 1}]});
    });
  });
});
