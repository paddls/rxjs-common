import {MonoTypeOperatorFunction} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

/**
 * cache observable data forever
 */
export function hardCache<T>(): MonoTypeOperatorFunction<T> {
  return shareReplay(1);
}
