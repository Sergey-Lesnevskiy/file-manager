import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

export const ls = async () => {
  try {
    function sort(arr) {
      arr.sort((a, b) => {
          const nameA = a.Name.toUpperCase();
          const nameB = b.Name.toUpperCase();
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          return 0;
      });
  }
    const listOfDirObjects = await readdir(process.cwd(), { withFileTypes: true });
    const directories = listOfDirObjects
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => ({
            Name: dirent.name,
            Type: 'directory'
        }));

    const files = listOfDirObjects
        .filter((dirent) => dirent.isFile())
        .map((dirent) => ({
            Name: dirent.name,
            Type: 'file'
        }));

    sort(directories);
    sort(files);

    console.table(directories.concat(files));
  } catch (error) {
    console.log('Operation failed!');
  }
};

