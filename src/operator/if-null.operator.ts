import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * filter == null value
 */
export function ifNull<T>(): MonoTypeOperatorFunction<T> {
  return filter((value: T) => value == null);
}
