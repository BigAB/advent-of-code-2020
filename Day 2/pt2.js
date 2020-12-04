import { map, count, filter } from 'rxjs/operators';
import { setUp } from '../setup';

const isValid = (rule, letter, password) => {
  const range = rule.split('-').map((index) => index - 1);
  return (
    (password[range[0]] === letter || password[range[1]] === letter) &&
    !(password[range[0]] === letter && password[range[1]] === letter)
  );
};

setUp((lines$) => {
  return lines$.pipe(
    map((v) => v.split(' ').map((s) => s.trim().replace(':', ''))),
    filter(([rule, letter, password]) => isValid(rule, letter, password)),
    count()
  );
}, 670);
