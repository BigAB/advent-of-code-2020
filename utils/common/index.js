export const pipe = (...fns) => (v) => fns.reduce((res, fn) => fn(res), v);

export const add = (t, v) => t + v;
export const sum = (...args) => args.reduce(add, 0);
export const product = (...args) => args.reduce((t, v) => t * v);
export const intersect = (a, b) => a.filter((x) => b.includes(x));
export const split = (a) => a.split('');
