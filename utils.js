export const pipe = (...fns) => (v) => fns.reduce((res, fn) => fn(res), v);

export const add = (t, v) => t + v;
export const sum = (...args) => args.reduce(add);
export const product = (...args) => args.reduce((t, v) => t * v);
export const intersect = (a, b) => a.filter((x) => b.includes(x));
export const split = (a) => a.split('');

/* combinations */
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

// Validation
export const testEach = (...fns) => (value) => fns.every((fn) => fn(value));

export const exactDigits = (numberOfDigits) => (value) =>
  new RegExp(`^[0-9]{${numberOfDigits}}$`).test(value);

export const inRange = (min, max) => (value) =>
  Number.parseInt(value) >= min && Number.parseInt(value) <= max;

export const isHex = (value) => /^#[\da-f|]{6}$/.test(value);
