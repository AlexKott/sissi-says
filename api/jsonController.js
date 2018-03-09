import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const contentDirectory = path.join(process.cwd(), 'src')

const filePaths = {
  content: path.join(process.cwd(), 'src', 'content.json'),
  structure: path.join(process.cwd(), 'structure.json'),
}

export function readJson(fileName) {
  return async (req, res) => {
    try {
      const file = await readFileAsync(filePaths[fileName] || `${fileName}.json`);
      const json = JSON.parse(file);
      res.send(json);
    } catch(error) {
      res.send({});
    }
  }
}

export function writeJson(fileName) {
  return async (req, res) => {
    const jsonData = req.body;
    try {
      await writeFileAsync(path.join(filePaths[fileName] || `${fileName}.json`);
      res.send(jsonData);
    } catch(error) {
      res.sendStatus(500);
    }
  }
}
