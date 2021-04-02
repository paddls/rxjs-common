import { interval, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { refreshOn } from './refresh-on.operator';

/**
 * emits sourceObs$'s result and triggers it every interval (dedicated to cold Observable update)
 * @param pollingInterval interval (in ms) between updates
 * @param pollOnStartup if true returns the emission of the cold Obs when it completes before applying the interval between calls
 */
export function poll<T>(pollingInterval: number, pollOnStartup: boolean = true): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) => {
    return pollOnStartup ? source$.pipe(
      refreshOn(interval(pollingInterval))
    ) : interval(pollingInterval).pipe(
      switchMap(() => source$)
    );
  };
}
