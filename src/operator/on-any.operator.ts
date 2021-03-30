import { EMPTY, merge, MonoTypeOperatorFunction, Observable, throwError } from 'rxjs';
import { catchError, isEmpty, switchMapTo, tap } from 'rxjs/operators';
import { softCache } from './soft-cache.operator';
import { ifTruthy } from './if-truthy.operator';

export function onAny<T>(next: () => void): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) => {
    const onValue$: Observable<any> = source$.pipe(
      tap(next),
      catchError((error: any) => {
        next();

        return throwError(error);
      }),
      softCache(),
    );
    const onEmpty$: Observable<any> = onValue$.pipe(
      isEmpty(),
      ifTruthy(),
      tap(next),
      switchMapTo(EMPTY),
    );

    return merge(onValue$, onEmpty$);
  };
}
