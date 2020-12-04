import { findSetsOfSizeThatSumToTotal } from '../utils';
import { map, take, scan, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

export const productOfNInputsThatTotal = (n, total) => (observable) => {
  const values$ = observable.pipe(map((line) => Number.parseInt(line)));
  // the cache is everything already processed before this value
  const cache$ = values$.pipe(
    scan((cache, newValue) => [newValue, ...cache], []),
    map(([, ...currentCache]) => currentCache)
  );
  return combineLatest([values$, cache$]).pipe(
    map(([newValue, cache]) => {
      // only scan through the old cache values, for better perf
      const cachedValues = findSetsOfSizeThatSumToTotal({
        values: cache,
        total: total - newValue,
        size: n - 1,
      });
      return [newValue, cachedValues];
    }),
    filter(([, cachedValues]) => cachedValues),
    map(([newValue, cachedValues]) => [newValue, ...cachedValues]),
    map((combo) => combo.reduce((t, v) => t * v)),
    // as soon as we get one match bail out
    take(1)
  );
};
