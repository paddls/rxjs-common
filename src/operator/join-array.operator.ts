import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

/**
 * Combines the latest values of source and each input array into a single array.
 * @param input$ Input array
 */
export function joinArray<I>(...input$: Observable<I[]>[]): any {
  return (source$: Observable<I[]>) => {
    return combineLatest([source$, ...input$]).pipe(
      map((sources: I[][]) => sources.flat()),
    );
  };
}
