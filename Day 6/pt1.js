import { map, reduce } from 'rxjs/operators';
import { setUp } from '../setup';
import { bufferUntilBlank } from '../util-operators';
import { add, split } from '../utils';

setUp((lines$) => {
  return lines$.pipe(
    bufferUntilBlank(),
    map((answers) => new Set(answers.flatMap(split)).size),
    reduce(add)
  );
}, 6259);
