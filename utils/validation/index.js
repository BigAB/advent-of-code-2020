export const testEach = (...fns) => (value) => fns.every((fn) => fn(value));

export const exactDigits = (numberOfDigits) => (value) =>
  new RegExp(`^[0-9]{${numberOfDigits}}$`).test(value);

export const inRange = (min, max) => (value) =>
  Number.parseInt(value) >= min && Number.parseInt(value) <= max;

export const isHex = (value) => /^#[\da-f|]{6}$/.test(value);
