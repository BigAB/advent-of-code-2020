import { exec } from 'child_process';

const [day, filename] = process.argv.slice(2);

exec(
  `node -r esm ${filename}.js`,
  {
    cwd: `Day ${day}`,
    stdio: 'pipe',
  },
  (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  }
);
