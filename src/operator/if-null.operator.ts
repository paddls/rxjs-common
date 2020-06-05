import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import {get} from 'lodash';

/**
 * filter == null value
 */
export function ifNull<T>(field?: string): MonoTypeOperatorFunction<T> {
  return filter((value: T) => field ? get(value, field) == null : value == null);
}
