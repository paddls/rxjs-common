import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * filter != null for every item of the array input
 */
export function ifNotNulls<I>(): any {
  return (source$: Observable<I[]>) => {
    return source$.pipe(
      filter((source: I[]) => source.every((item: I) => item != null)),
    );
  };
}
