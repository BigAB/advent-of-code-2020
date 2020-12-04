import { map, count, filter } from 'rxjs/operators';
import { setUp } from '../setup';

const isValid = (rule, letter, password) => {
  const range = rule.split('-');
  const occurences = [...password].filter((char) => char === letter).length;
  return occurences >= range[0] && occurences <= range[1];
};

setUp((lines$) => {
  return lines$.pipe(
    map((v) => v.split(' ').map((s) => s.trim().replace(':', ''))),
    filter(([rule, letter, password]) => isValid(rule, letter, password)),
    count()
  );
}, 666);
