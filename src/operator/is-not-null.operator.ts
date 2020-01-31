import {MonoTypeOperatorFunction} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * filter not null value
 */
export function isNotNull<T>(): MonoTypeOperatorFunction<T> {
  return filter((value: T) => value != null);
}
