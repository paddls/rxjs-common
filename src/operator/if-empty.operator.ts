import { asyncScheduler, merge, Observable, of, OperatorFunction } from 'rxjs';
import {filter, isEmpty, observeOn, switchMapTo} from 'rxjs/operators';
import {softCache} from './soft-cache.operator';

/**
 * Return default observable when parent return empty
 * @param value when the observable return empty
 */
export function ifEmpty<I, O>(value: Observable<O> | O): OperatorFunction<I, I|O> {
  const value$: Observable<O> = value instanceof Observable ? value : of(value);

  return (source$: Observable<I>) => {
    const cachedSource$: Observable<I> = source$.pipe(observeOn(asyncScheduler), softCache());

    return merge(cachedSource$, cachedSource$.pipe(
      isEmpty(),
      filter((empty: boolean) => empty),
      switchMapTo(value$)
    ));
  };
}
