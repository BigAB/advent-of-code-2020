const { createInterface } = require('readline');
const { Transform, Readable } = require('stream');
const { createReadStream } = require('fs');

function readFileLineByLine(path) {
  class ValueStream extends Transform {
    _transform(data, encoding, callback) {
      this.push(data.toString());
      callback();
    }
  }

  try {
    const rl = createInterface({
      input: createReadStream(path, { encoding: 'utf-8' }),
      crlfDelay: Infinity,
      encoding: 'utf-8',
    });

    return Readable.from(rl).pipe(new ValueStream({ objectMode: true }));
  } catch (err) {
    console.error(err);
  }
}

class SolutionStream extends Transform {
  _transform(data, encoding, callback) {
    this.push(JSON.stringify({ data: data.toString() }) + '\n');
    callback();
  }
}

const lines = readFileLineByLine('./Day 1/input');

lines.pipe(new SolutionStream()).pipe(process.stdout);
