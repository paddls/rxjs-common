import { MonoTypeOperatorFunction } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

/**
 * cache observable data forever
 */
export function hardCache<T>(expires: number = null): MonoTypeOperatorFunction<T> {
  return shareReplay(1, expires);
}
