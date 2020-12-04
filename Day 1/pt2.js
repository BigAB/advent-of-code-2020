import { setUp } from '../setup';
import { productOfNInputsThatTotal } from './product-operator';

setUp((lines$) => {
  return lines$.pipe(productOfNInputsThatTotal(3, 2020));
}, 51810360);
