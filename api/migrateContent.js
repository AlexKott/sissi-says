import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';

const HASH_FILE_NAME = '.sthash';
const hashPath = path.join(process.cwd(), HASH_FILE_NAME);

let movesBinPath;
const pkgPath = path.join(__dirname, '..');
const movesModule = 'node_modules/.bin/sissi-moves';

if (fs.existsSync(path.join(pkgPath, movesModule))) {
  movesBinPath = path.join(pkgPath, movesModule);
} else {
  movesBinPath = path.join(pkgPath, '..', movesModule);
}

export default function migrateContent() {
  return new Promise((resolve, reject) => {
    let prevHash = '';
    try {
      prevHash = fs.readFileSync(hashPath, 'utf-8').trim();
    } catch(e) {}

    execFile(movesBinPath, [
      'hash',
    ], (error, stdout, stderr) => {
      if (error || stderr) {
        return reject(error || stderr);
      }
      const newHash = stdout.trim();

      if (newHash === prevHash) {
        return resolve();
      }

      execFile(movesBinPath, [
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
