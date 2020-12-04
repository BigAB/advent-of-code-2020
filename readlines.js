import { eachLine } from 'line-reader';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import { promisify } from 'util';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export const readlines = promisify(eachLine);

export const fromFileLines = (filePath) => {
  return new Observable((subscriber) => {
    let closed = false;
    readlines(filePath, (line) => {
      if (!closed) {
        subscriber.next(line);
      }
      return !closed;
    })
      .then(() => subscriber.complete())
      .catch((err) => subscriber.error(err));
    return () => {
      closed = true;
    };
  }).pipe(share());
};

export const streamOfLinesFromFile = (path) => {
  try {
    const rl = createInterface({
      input: createReadStream(path, { encoding: 'utf-8' }),
      crlfDelay: Infinity,
      encoding: 'utf-8',
    });

    return Readable.from(rl);
  } catch (err) {
    console.error(err);
  }
};

export default readlines;
