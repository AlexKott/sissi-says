import fs from 'fs';
import path from 'path';

const imageDirectory = path.join(process.cwd(), 'images');
try {
  fs.statSync(imageDirectory);
} catch (error) {
  fs.mkdirSync(imageDirectory);
}

export function saveImage(req, res) {
  if (!req.files) {
    return res.sendStatus(400);
  }

  const files = Object.keys(req.files);
  files.forEach(file => {
    const fileName = req.files[file].name;
    req.files[file].mv(`${imageDirectory}/${fileName}`, (err) => {
      if (err) {
        return res.sendStatus(500);
      }
      res.sendStatus(201);
    });
  });
}
