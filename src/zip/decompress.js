import { createBrotliDecompress } from 'node:zlib';
import { createWriteStream, createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { sep, resolve } from 'node:path';
import { exists } from '../utils/others.js';

export const decompress = async (parameters) => {
  try {
    const pathToSrcFile = resolve(parameters[0]);
    const sourceFile = pathToSrcFile.split(sep).pop().replace('.br', '');
    const pathToDestination = resolve(resolve(parameters[1]), sourceFile);
    const isSourceFileExists = await exists(pathToSrcFile);
    if (!isSourceFileExists) {
      console.log('There is no file in directory');
      console.log('Operation failed');
      return;
    }
    const input = createReadStream(pathToSrcFile, { flags: 'r' });
    const output = createWriteStream(pathToDestination, { flags: 'wx' });
    const unzip = createBrotliDecompress();
    await pipeline(input, unzip, output);
    console.log('Uncompressed successful');
  } catch (error) {
    console.log('Operation failed');
  }
};

