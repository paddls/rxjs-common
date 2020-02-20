import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * filter != null value
 */
export function ifNotNull<T>(): MonoTypeOperatorFunction<T> {
  return filter((value: T) => value != null);
}
