import { EMPTY, merge, MonoTypeOperatorFunction, Observable, throwError } from 'rxjs';
import { catchError, isEmpty, switchMapTo, tap } from 'rxjs/operators';
import { ifTruthy } from './if-truthy.operator';

export function onAny<T>(next: () => void): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) => {
    const onValue$: Observable<any> = source$.pipe(
      tap(() => {
        next();
      })
    );
    const onEmpty$: Observable<any> = source$.pipe(
      isEmpty(),
      ifTruthy(),
      tap(next),
      switchMapTo(EMPTY)
    );

    return merge(onValue$, onEmpty$).pipe(
      catchError((error: any) => {
        next();

        return throwError(error);
      })
    );
  };
}
