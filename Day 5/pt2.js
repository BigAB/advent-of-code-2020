import { map, reduce } from 'rxjs/operators';
import { setUp } from '../setup';
import { bspCodeToSeatId, NUM_OF_COLUMNS, NUM_OF_ROWS } from './plane-seats';

// set of ints: 0 - 1023 (Max 1024 Seats)
const allSeatIds = new Set(
  Array.from({ length: NUM_OF_COLUMNS * NUM_OF_ROWS }, (_, i) => i)
);

const removeItemFromSet = (set, item) => {
  allSeatIds.delete(item);
  return set;
};

setUp((lines$) => {
  return lines$.pipe(
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
  );
}, 653);
