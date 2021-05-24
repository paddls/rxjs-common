import { MonoTypeOperatorFunction, Observable, timer } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { hardCache } from './hard-cache.operator';

/**
 * caches observable data until expiration
 */
export function expirableCache<T>(expires: number): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) => source$.pipe(
    takeUntil(timer(expires)),
    hardCache()
  );
}
