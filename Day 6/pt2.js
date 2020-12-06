import { map, reduce } from 'rxjs/operators';
import { setUp } from '../setup';
import { bufferUntilBlank } from '../util-operators';
import { intersect, add, split } from '../utils';

setUp((lines$) => {
  return lines$.pipe(
    bufferUntilBlank(),
    map((groupAnswers) => groupAnswers.map(split).reduce(intersect).length),
    reduce(add)
  );
}, 3178);
