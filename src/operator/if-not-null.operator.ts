import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import get from 'lodash/get';

/**
 * filter != null value
 * @param field optional string to filter on specific object field (ex: 'id', 'user.id')
 */
export function ifNotNull<T>(field?: string): MonoTypeOperatorFunction<T> {
  return filter((value: T) => field ? get(value, field) != null : value != null);
}
