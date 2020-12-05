import { map, max } from 'rxjs/operators';
import { setUp } from '../setup';
import { bspCodeToSeatId } from './plane-seats';

setUp((lines$) => {
  return lines$.pipe(map(bspCodeToSeatId), max());
}, 951);
