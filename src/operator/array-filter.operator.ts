import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { filter, get, isFunction } from 'lodash';

type Predicate<I> = ((a: I, b: I) => boolean);
type PredicateParam<I> = Predicate<I> | string;

/**
 * filter array by the array input
 * @param values$ the values to filter
 * @param predicate optional function or string to define the filter criteria
 */
export function arrayFilter<I>(values$: Observable<I[]>, predicate?: PredicateParam<I>): any {
  const defaultPredicate: Predicate<I> = (a: I, b: I) => a === b;
  const stringPredicate: Predicate<I> = ((a: I, b: I) => get(a, predicate as string) === get(b, predicate as string));
  predicate = predicate || defaultPredicate;
  const finalPredicate: Predicate<I> = isFunction(predicate) ? predicate : stringPredicate;

  return (source$: Observable<I[]>) => {
    return combineLatest([source$, values$]).pipe(
      map(([source, deleted]: [I[], I[]]) => {
        return filter(source, (e: any) => !deleted.find((de: any) => finalPredicate(e, de)));
      }),
    );
  };
}
