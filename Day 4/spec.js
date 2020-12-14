import { filter, count } from 'rxjs/operators';
import { fromFileLines } from '../utils';
import { inputToPassport, hasAllFields, isValidPassport } from './passports';

describe('Day 4', () => {
  test('Part 1', async () => {
    const answer = await fromFileLines(__dirname, './input')
      .pipe(inputToPassport(), filter(hasAllFields), count())
      .toPromise();

    expect(answer).toEqual(237);
  });

  test('Part 2', async () => {
    const answer = await fromFileLines(__dirname, './input')
      .pipe(inputToPassport(), filter(isValidPassport), count())
      .toPromise();

    expect(answer).toEqual(172);
  });
});
