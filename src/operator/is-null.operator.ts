import {MonoTypeOperatorFunction} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * filter not null value
 */
export function isNull<T>(): MonoTypeOperatorFunction<T> {
  return filter((value: T) => value == null);
}
