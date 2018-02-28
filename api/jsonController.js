import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export function readJson(fileName) {
  return async (req, res) => {
    try {
      const file = await readFileAsync(path.join(process.cwd(), `${fileName}.json`));
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
      await writeFileAsync(path.join(process.cwd(), `${fileName}.json`), JSON.stringify(jsonData));
      res.send(jsonData);
    } catch(error) {
      res.sendStatus(500);
    }
  }
}
