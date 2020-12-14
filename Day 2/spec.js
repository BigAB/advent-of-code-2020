import { map, count, filter } from 'rxjs/operators';
import { fromFileLines } from '../utils';
import {
  passwordHasCharAtOnePosition,
  passwordHasValidCharOccurences,
} from './password-validations';

describe('Day 2', () => {
  test('Part 1', async () => {
    const answer = await fromFileLines(__dirname, './input')
      .pipe(
        map((v) => v.split(' ').map((s) => s.trim().replace(':', ''))),
        filter(([rule, letter, password]) =>
          passwordHasValidCharOccurences(rule, letter, password)
        ),
        count()
      )
      .toPromise();

    expect(answer).toEqual(666);
  });

  test('Part 2', async () => {
    const answer = await fromFileLines(__dirname, './input')
      .pipe(
        map((v) => v.split(' ').map((s) => s.trim().replace(':', ''))),
        filter(([rule, letter, password]) =>
          passwordHasCharAtOnePosition(rule, letter, password)
        ),
        count()
      )
      .toPromise();

    expect(answer).toEqual(670);
  });
});
