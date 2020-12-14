import { fromFileLines } from '../utils';
import { productOfNInputsThatTotal } from './product-operator';

// Yes I "could" just use a simple for loop, but that would defeat the point wouldn't it?
describe('Day 1', () => {
  test('Part 1', async () => {
    const answer = await fromFileLines(__dirname, './input')
      .pipe(productOfNInputsThatTotal(2, 2020))
      .toPromise();

    expect(answer).toEqual(996075);
  });

  test('Part 2', async () => {
    const answer = await fromFileLines(__dirname, './input')
      .pipe(productOfNInputsThatTotal(3, 2020))
      .toPromise();

    expect(answer).toEqual(51810360);
  });
});
