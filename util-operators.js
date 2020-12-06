import { filter, bufferWhen } from 'rxjs/operators';

export const takeEveryNth = (n) => filter((value, index) => index % n === 0);

export const bufferUntilBlank = () => (lines$) => {
  const blankLines$ = lines$.pipe(filter((line) => line === ''));
  return lines$.pipe(
    filter((line) => line !== ''),
    bufferWhen(() => blankLines$)
  );
};
