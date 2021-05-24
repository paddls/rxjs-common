import { finalize } from 'rxjs/operators';
import { defer, MonoTypeOperatorFunction, Observable } from 'rxjs';

let totalSubscriptions: number = 0;
const subscriptionsCounter: Map<string, number> = new Map();

/**
 * count subscribers to detect subscription leak
 * @param name name of the
 */
export function countSubscription<T>(name: string): MonoTypeOperatorFunction<T> {
  return function refCountOperatorFunction(source$: Observable<any>): Observable<any> {
    return defer(() => {
      increment(name);
      logSubscriptionCount(name);
      return source$;
    }).pipe(
      finalize(() => {
        decrement(name);
        logSubscriptionCount(name);
      })
    );
  };

  function increment(id: string): void {
    const count: number = subscriptionsCounter.get(id) || 0;
    totalSubscriptions++;
    subscriptionsCounter.set(id, count + 1);
  }

  function decrement(id: string): void {
    const count: number = subscriptionsCounter.get(id) || 0;
    totalSubscriptions--;
    if (count >= 1) {
      subscriptionsCounter.set(id, count - 1);
    } else {
      subscriptionsCounter.delete(id);
    }
  }

  function logSubscriptionCount(id: string): void {
    const count: number = subscriptionsCounter.get(id) || 0;
    if (id) {
      console.log(`${ count }/${ totalSubscriptions } subscription for ${ id }`);
    } else {
      console.log(`${ count }/${ totalSubscriptions } subscription`);
    }
  }
}
