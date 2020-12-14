import { from } from 'rxjs';
import { map, tap, reduce, mergeMap } from 'rxjs/operators';
import { fromFileLines } from '../utils';
import { countTreesBySlope } from './count-trees-by-slope';

describe('Day 3', () => {
  test('Part 1', async () => {
    const DEBUG = false;
    const answer = await fromFileLines(__dirname, './input')
      .pipe(
        countTreesBySlope(3, 1),
        tap(({ board }) => (DEBUG ? console.log(board) : undefined)),
        map(({ count }) => count)
      )
      .toPromise();

    expect(answer).toEqual(151);
  });

  test('Part 2', async () => {
    const slopes = [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ];
    const lines$ = fromFileLines(__dirname, './input');

    const answer = await from(slopes)
      .pipe(
        mergeMap(([right, down]) => {
          return lines$.pipe(countTreesBySlope(right, down));
        }),
        reduce((product, { count }) => product * count, 1)
      )
      .toPromise();

    expect(answer).toEqual(7540141059);
  });
});
