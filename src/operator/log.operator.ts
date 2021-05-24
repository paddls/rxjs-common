import { MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * log data passing through operator
 * @param messages extra information to log
 */
export function log<T>(...messages: any): MonoTypeOperatorFunction<T> {
  return tap((value: any) => console.log(...messages, value));
}
