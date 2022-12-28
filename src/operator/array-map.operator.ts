import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Calls a defined callback function on each element of source's array, and returns an array that contains the results.
 * @param callbackFn A function that accepts up to three arguments. The map method calls the callbackFn function one time for each element in the array.
 * @param thisArg An object to which the 'this' keyword can refer in the callbackFn function. If thisArg is omitted, undefined is used as the 'this' value.
 */
export function arrayMap<T, U>(callbackFn: (value: T, index: number, array: T[]) => U, thisArg?: any): OperatorFunction<T[], U[]> {
  return map((value: T[]) => value.map(callbackFn, thisArg));
}
