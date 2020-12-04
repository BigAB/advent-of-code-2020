import { filter, count } from 'rxjs/operators';
import { setUp } from '../setup';
import { inputToPassport, hasAllFields } from './passports';

setUp((lines$) => {
  return lines$.pipe(inputToPassport(), filter(hasAllFields), count());
}, 237);
