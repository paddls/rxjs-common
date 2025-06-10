import {Observable, OperatorFunction} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * filter !!value
 */
export function ifTruthy<I>(): OperatorFunction<NonNullable<I> | null | undefined, NonNullable<I>> {
  return (source$: Observable<I>) => source$.pipe(
    filter((input: I | null | undefined): input is NonNullable<I> => !!input)
  );
}
