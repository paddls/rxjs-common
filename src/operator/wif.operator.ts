import { switchMap } from 'rxjs/operators';
import { Observable, of, OperatorFunction } from 'rxjs';
import isFunction from 'lodash-es/isFunction';

type WhenResult<I, O> = ((input: I) => Result<O>) | Result<O>;
type Result<O> = O | Observable<O>;

/**
 * Return conditionally whenTrue or whenFalse
 * @param condition evaluate the condition from the emitted value
 * @param whenTrue to be returned when condition is true
 * @param whenFalse to be returned when condition is false
 */
export function wif<I, T, E>(condition: (input: I) => boolean, whenTrue: WhenResult<I, T>, whenFalse: WhenResult<I, E> = (input: any) => input): OperatorFunction<I, T | E> {
  return (source$: Observable<I>) => source$.pipe(
    switchMap((input: I) => {
      const route: WhenResult<I, T> | WhenResult<I, E> = condition(input) ? whenTrue : whenFalse;
      const next: Result<T> | Result<E> = isFunction(route) ? route(input) : route;

      return next instanceof Observable ? next : of(next);
    })
  );
}
