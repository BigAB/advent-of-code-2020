import { filter, count } from 'rxjs/operators';
import { setUp } from '../setup';
import { isValidPassport, inputToPassport } from './passports';

setUp((lines$) => {
  return lines$.pipe(inputToPassport(), filter(isValidPassport), count());
}, 172);
