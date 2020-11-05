import {interval, merge, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

/**
 * emits sourceObs$'s result and triggers it every interval (dedicated to cold Observable update)
 * @param pollingInterval interval (in ms) between updates
 * @param pollOnStartup if true returns the emission of the cold Obs when it completes before applying the interval between calls
 */
export function poll<T>(pollingInterval: number, pollOnStartup: boolean): any {
  return (source$: Observable<T>) => {
    const polledSource$: Observable<T> = interval(pollingInterval).pipe(
      switchMap(() => source$)
    );
    return (pollOnStartup) ? merge(source$, polledSource$) : polledSource$;
  };
}
