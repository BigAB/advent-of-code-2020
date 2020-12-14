import { map, reduce } from 'rxjs/operators';
import { fromFileLines, add, split, intersect } from '../utils';
import { bufferUntilBlank } from '../utils/operators';

describe('Day 6', () => {
  test('Part 1', async () => {
    const answer = await fromFileLines(__dirname, './input')
      .pipe(
        bufferUntilBlank(),
        map((answers) => new Set(answers.flatMap(split)).size),
        reduce(add)
      )
      .toPromise();

    expect(answer).toEqual(6259);
  });

  test('Part 2', async () => {
    const answer = await fromFileLines(__dirname, './input')
      .pipe(
        bufferUntilBlank(),
        map((groupAnswers) => groupAnswers.map(split).reduce(intersect).length),
        reduce(add)
      )
      .toPromise();

    expect(answer).toEqual(3178);
  });
});
