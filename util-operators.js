import { filter } from 'rxjs/operators';

export const takeEveryNth = (n) => filter((value, index) => index % n === 0);
