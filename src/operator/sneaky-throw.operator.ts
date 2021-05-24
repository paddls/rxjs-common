import { EMPTY, MonoTypeOperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * catches observable error and returns EMPTY
 */
export function sneakyThrow<T>(): MonoTypeOperatorFunction<T> {
  return catchError(() => EMPTY);
}
