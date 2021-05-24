import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { joinArray } from './join-array.operator';

describe('joinArray', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should return [1], [1, 2], [3]', () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const input$: Observable<number[]> = hot('ab-c', {
        a: [],
        b: [2],
        c: []
      });

      const source$: Observable<number[]> = hot('a-b', {
        a: [1],
        b: [3]
      }).pipe(
        joinArray(input$),
      );

      expectObservable(source$).toBe('abcd', {a: [1], b: [1, 2], c: [3, 2], d: [3]});
    });
  });

  it('should return [1, 4, 5], [1, 2, 4, 5], [3, 2, 4, 5], [3, 4, 5]', () => {
    testScheduler.run(({expectObservable, hot}: RunHelpers) => {
      const inputOne$: Observable<number[]> = hot('-ab-c', {
        a: [],
        b: [2],
        c: []
      });

      const inputTwo$: Observable<number[]> = hot('a', {
        a: [4, 5]
      });

      const source$: Observable<number[]> = hot('-a-b', {
        a: [1],
        b: [3]
      }).pipe(
        joinArray(inputOne$, inputTwo$)
      );

      expectObservable(source$).toBe('-abcd', {a: [1, 4, 5], b: [1, 2, 4, 5], c: [3, 2, 4, 5], d: [3, 4, 5]});
    });
  });
});
