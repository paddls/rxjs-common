import { filter } from 'rxjs/operators';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

/**
 * filter !!value
 */
export function ifTruthy<I>(): MonoTypeOperatorFunction<I> {
  return (source$: Observable<I>) => source$.pipe(
    filter((input: I) => !!input)
  );
}
