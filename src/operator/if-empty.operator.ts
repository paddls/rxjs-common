import { merge, Observable, of } from 'rxjs';
import { filter, isEmpty, switchMapTo } from 'rxjs/operators';

/**
 * return default observable when parent return empty
 * @param value when the observable return empty
 */
export function ifEmpty<I, O>(value: Observable<O> | O): any {
  const value$: Observable<O> = value instanceof Observable ? value : of(value);

  return (source$: Observable<I>) => merge(source$, source$.pipe(
    isEmpty(),
    filter((empty: boolean) => empty),
    switchMapTo(value$)
  ));
}
