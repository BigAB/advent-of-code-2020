import { from } from 'rxjs';
import { reduce, mergeMap } from 'rxjs/operators';
import { setUp } from '../setup';
import { countTreesBySlope } from './count-trees-by-slope';

setUp((lines$) => {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  return from(slopes).pipe(
    mergeMap(([right, down]) => {
      return lines$.pipe(countTreesBySlope(right, down));
    }),
    reduce((product, { count }) => product * count, 1)
  );
}, 7540141059);
