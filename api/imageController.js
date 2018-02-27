import fs from 'fs';
import path from 'path';
import hash from 'shorthash';

const imageDirectory = path.join(process.cwd(), 'public', 'images');
try {
  fs.statSync(imageDirectory);
} catch (error) {
  fs.mkdirSync(imageDirectory);
}

export function getAllImages(req, res) {
  fs.readdir(imageDirectory, (error, files) => {
    if (error) {
      return res.sendStatus(500);
    }
    res.send(files);
  });
}

export async function saveImage(req, res) {
  if (!req.files) {
    return res.sendStatus(400);
  }
  const savedFiles = await saveFiles(req.files);

  res.send(savedFiles);
}

async function saveFiles(files) {
  const fileNames = {};
  const errors = {};

  const promises = Object.keys(files).map(file => {
    return new Promise(resolve => {
      const now = (new Date).getTime();
      const nameParts = files[file].name.split('.');
      const hashedName = hash.unique(`${nameParts[0]}${now}`);
      const fileName = `${hashedName}.${nameParts[1]}`;

      files[file].mv(`${imageDirectory}/${fileName}`, (err) => {
        if (!err) {
          fileNames[file] = fileName;
        } else {
          errors[file] = err;
        }
        resolve();
      });
    });
  });
  await Promise.all(promises);
  return { fileNames, errors };
}
