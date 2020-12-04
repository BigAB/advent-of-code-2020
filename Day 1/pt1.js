import { setUp } from '../setup';
import { productOfNInputsThatTotal } from './product-operator';

// Yes I "could" just use a simple for loop, but that would defeat the point wouldn't it?
setUp((lines$) => {
  return lines$.pipe(productOfNInputsThatTotal(2, 2020));
}, 996075);
