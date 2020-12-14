import { map } from 'rxjs/operators';
import { fromFileLines } from '../utils';
import {
  parseRule,
  createGraphOfBags,
  searchGraphForNumberOfBagsThatHold,
} from './bags';

describe('Day 7', () => {
  test('Part 1', async () => {
    const answer = await fromFileLines(__dirname, './input')
      .pipe(
        map(parseRule),
        createGraphOfBags(),
        map(searchGraphForNumberOfBagsThatHold('shiny gold'))
      )
      .toPromise();

    expect(answer).toEqual(192);
  });

  test('Part 2', async () => {
    const answer = await fromFileLines(__dirname, './input')
      .pipe(
        map(parseRule),
        createGraphOfBags(),
        map((graph) => graph.recursivelyCountWeightCumulative('shiny gold'))
      )
      .toPromise();

    expect(answer).toEqual(12128);
    // expect(answer).toEqual(126); // ./alt-input
    // expect(answer).toEqual(32); // ./small-input
  });
});
