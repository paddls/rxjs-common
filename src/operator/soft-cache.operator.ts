import {shareReplay} from 'rxjs/operators';
import {MonoTypeOperatorFunction} from 'rxjs';

/**
 * cache observable data until no subscriber
 */
export function softCache<T>(): MonoTypeOperatorFunction<T> {
  return shareReplay({
    refCount: true,
    bufferSize: 1
  });
}
