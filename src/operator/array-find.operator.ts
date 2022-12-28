import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns the single element of source's array that meet the condition specified in a callback function.
 * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
 * @param thisArg An object to which the 'this' keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the 'this' value.
 */
export function arrayFind<T>(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): OperatorFunction<T[], T> {
  return map((value: T[]) => value?.find(predicate, thisArg));
}
