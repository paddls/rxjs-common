import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Maps to true if every element of source's array matches the predicate, false otherwise.
 * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
 * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
 */
export function arrayEvery<T>(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): OperatorFunction<T[], boolean> {
  return map((value: T[]) => value?.every(predicate, thisArg));
}
