import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns the elements of source's array that meet the condition specified in a callback function.
 * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
 * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
 */
export function arrayFilter<T>(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): MonoTypeOperatorFunction<T[]> {
  return map((value: T[]) => value.filter(predicate, thisArg));
}
