import { map, reduce } from 'rxjs/operators';
import { takeEveryNth } from '../utils/operators';
import { split } from '../utils';

export const countTreesBySlope = (right, down) => (lines$) => {
  return lines$.pipe(
    map(split),
    takeEveryNth(down),
    reduce(
      ({ x, count, rows }, row, index) => {
        if (index === 0) {
          return {
            x,
            count,
            rows: [...rows, row.map((v, index) => (index === x ? 'S' : v))],
          };
        }

        const pos = (x + right) % row.length;
        return {
          x: pos,
          count: row[pos] === '.' ? count : count + 1,
          rows: [...rows, row.map((v, index) => (index === pos ? 'X' : v))],
        };
      },
      { x: 0, count: 0, rows: [] }
    ),
    map(({ rows, count }) => ({
      count,
      board: rows.map((row) => row.join('') + '\n').join(''),
    }))
  );
};
