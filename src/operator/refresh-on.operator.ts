import { merge, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

/**
 * emits or re-emits source$'s result at each trigger$ observable emission
 * @param triggers$ source$'s emission or reemission triggers
 */
export function refreshOn<T>(...triggers$: Observable<any>[]): MonoTypeOperatorFunction<T> {
    return (source$: Observable<T>) => {
        return merge(
            source$,
            ...triggers$.map((trigger$: Observable<any>) => trigger$.pipe(
                switchMap(() => source$.pipe(
                    take(1)
                ))
            ))
        );
    };
}
