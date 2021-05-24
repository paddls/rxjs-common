import { scan } from 'rxjs/operators';
import { Observable, OperatorFunction } from 'rxjs';

/**
 * like toArray but for hot observables
 */
export function toHotArray<I>(): OperatorFunction<I, I[]> {
  return (source$: Observable<I>) => source$.pipe(
    scan((acc: I[], input: I) => [...acc, input], [])
  );
}
