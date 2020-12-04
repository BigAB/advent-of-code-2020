import { fromFileLines } from './readlines';

/**
 * wraps a solution function, pipes in input lines from
 * a file named `./input`, and takes the returned observable
 * of answer and subscribes to it, logging the results and time
 * in the console
 *
 * (p.s. I don't know how to JSDoc)
 *
 * @param {function(Observable<string>): Observable<Answer>} solution a function that recieves an observable of 'lines' (strings) and returns an observable that emits 1 answer and completes
 * @params {*} [expected] value to check the answer against
 * @returns {Observable<Answer>} and observable that emits one answer and completes
 *
 */
export const setUp = (solution, expected) => {
  console.time('Calculation time');
  let answered = false;
  const lines$ = fromFileLines('./input');

  lines$.pipe(solution).subscribe({
    next(answer) {
      answered = true;
      console.timeEnd('Calculation time');
      console.log(`Answer:${/[\n\r]/.test(answer) ? '\n' : ''} ${answer}`);
      if (expected !== undefined) {
        console.log(answer === expected ? 'CORRECT!' : 'WRONG!');
      }
    },
    complete() {
      if (!answered) {
        console.log('No answer was found');
      }
    },
    error(err) {
      console.error(err);
    },
  });
};
