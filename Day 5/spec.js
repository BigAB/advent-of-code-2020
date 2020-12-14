import { map, max, reduce } from 'rxjs/operators';
import { fromFileLines } from '../utils';
import { bspCodeToSeatId, NUM_OF_COLUMNS, NUM_OF_ROWS } from './plane-seats';

describe('Day 5', () => {
  test('Part 1', async () => {
    const answer = await fromFileLines(__dirname, './input')
      .pipe(map(bspCodeToSeatId), max())
      .toPromise();

    expect(answer).toEqual(951);
  });

  test('Part 2', async () => {
    // set of ints: 0 - 1023 (Max 1024 Seats)
    const allSeatIds = new Set(
      Array.from({ length: NUM_OF_COLUMNS * NUM_OF_ROWS }, (_, i) => i)
    );

    const removeItemFromSet = (set, item) => {
      allSeatIds.delete(item);
      return set;
    };

    const answer = await fromFileLines(__dirname, './input')
      .pipe(
        map(bspCodeToSeatId),
        // Remove each seatId from the set of all seat ids
        reduce(removeItemFromSet, allSeatIds),
        // find a seat who IDs +1 and -1 are not in the list of empty seats
        map((setOfEmptySeats) =>
          [...setOfEmptySeats].find(
            (seat, i, seats) =>
              seats[i - 1] !== seat - 1 && seats[i + 1] !== seat + 1
          )
        )
      )
      .toPromise();

    expect(answer).toEqual(653);
  });
});
