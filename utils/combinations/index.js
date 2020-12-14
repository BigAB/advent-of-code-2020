import { sum } from '../common';

export const combinationsOfSizeN = (arrayOfThings, n) => {
  if (n > arrayOfThings.length || n <= 0) {
    return [];
  }
  if (n == arrayOfThings.length) {
    return [arrayOfThings];
  }
  if (n == 1) {
    return arrayOfThings.map((v) => [v]);
  }
  return arrayOfThings.flatMap((head, index, full) => {
    return combinationsOfSizeN(full.slice(index + 1), n - 1).map((tc) => [
      head,
      ...tc,
    ]);
  });
};

export const findSetsOfSizeThatSumToTotal = ({ total, values, size }) => {
  if (values.length >= size) {
    return combinationsOfSizeN(values, size).find(
      (comb) => sum(...comb) === total
    );
  }
};
