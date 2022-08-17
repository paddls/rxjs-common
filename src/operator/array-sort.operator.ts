import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Maps to true if every element of source's array matches the predicate, false otherwise.
 * @param compareFn Specifies a function that defines the sort order. If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value.
 */
export function arraySort<T>(compareFn?: (a: T, b: T) => number): OperatorFunction<T[], T[]> {
  return map((value: T[]) => value?.sort(compareFn));
}
