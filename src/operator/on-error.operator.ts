import {MonoTypeOperatorFunction, ObservableInput, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export function onError<T>(type: any, callback: (error: any) => ObservableInput<any>): MonoTypeOperatorFunction<T> {
  return catchError((caughtError: any) => {
      if (caughtError instanceof type) {
        return callback(caughtError);
      } else {
        return throwError(caughtError);
      }
    }
  );
}
