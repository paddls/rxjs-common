import { scan } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * like toArray but for hotObservable
 */
export function toHotArray<I>(): any {
  return (source$: Observable<I>) => source$.pipe(
    scan((acc: I[], input: I) => [...acc, input], []),
  );
}
