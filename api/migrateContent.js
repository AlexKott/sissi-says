import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';

const HASH_FILE_NAME = '.sthash';
const hashPath = path.join(process.cwd(), HASH_FILE_NAME);

export default function migrateContent() {
  return new Promise((resolve, reject) => {
    let prevHash = '';
    try {
      prevHash = fs.readFileSync(hashPath, 'utf-8').trim();
    } catch(e) {}

    execFile(path.join(__dirname, '../node_modules/.bin/sissi-moves'), [
      'hash',
    ], (error, stdout, stderr) => {
      if (error || stderr) {
        return reject(error || stderr);
      }
      const newHash = stdout.trim();

      if (newHash === prevHash) {
        return resolve();
      }

      execFile(path.join(__dirname, '../node_modules/.bin/sissi-moves'), [
        'migrate',
      ], (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(error || stderr);
        }
        if (stdout) {
          console.log(stdout);
        }
        resolve();
      });
    });
  });
}

export async function migrateContentMiddleware(req, res, next) {
  try {
    await migrateContent();
    next();

  } catch(error) {
    console.log(error);
    return res.sendStatus(500)
  }
}