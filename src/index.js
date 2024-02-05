import { parseArgs } from './cli/args.js';
import { homedir } from 'os';
import * as readline from 'node:readline';
import { ls } from './fs/ls.js';
import { currentDirectory } from './currentDirectory/currentDirectory.js';
import { cat } from './fs/cat.js';
import { add } from './fs/add.js';
import { rn } from './fs/rn.js';
import { rm } from './fs/rm.js';

const fileManager = async () => {
  const username = parseArgs();
  const homeDir = homedir();
  process.chdir(homeDir);
  process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
  currentDirectory();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', async (line) => {
    const lineArr = line.split(' ').filter((el) => el.trim());
    const command = lineArr[0];
    const parameters = lineArr.slice(1);
    switch (command) {
      case '.close':
        rl.close();
        break;
      case 'ls':
        if (parameters.length === 0) {
          await ls();
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'cat':
        if (parameters.length === 1) {
          await cat(parameters).then((result) => {
            process.stdout.write(result);
          });
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'add':
        if (parameters.length === 1) {
          await add(parameters).then((result) => {
            process.stdout.write(result);
          });
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'rn':
        if (parameters.length === 2) {
          await rn(parameters);
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'rm':
        if (parameters.length === 1) {
          await rm(parameters);
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      default:
        process.stdout.write(`Invalid input\n`);
        break;
    }
  });
  rl.on('close', () => {
    process.stdout.write(`Thank you for using File Manager, ${username}!`);
  });
};

await fileManager();

