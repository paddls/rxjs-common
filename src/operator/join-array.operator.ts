import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

export function joinArray<I>(input$: Observable<I[]>): any {
  return (source$: Observable<I[]>) => {
    return combineLatest([source$, input$]).pipe(
      map(([source, input]: [I[], I[]]) => [...source, ...input]),
    );
  };
}
