import { tap, map } from 'rxjs/operators';
import { setUp } from '../setup';
import { countTreesBySlope } from './count-trees-by-slope';

const DEBUG = false;

setUp((lines$) => {
  return lines$.pipe(
    countTreesBySlope(3, 1),
    tap(({ board }) => (DEBUG ? console.log(board) : undefined)),
    map(({ count }) => count)
  );
}, 151);
