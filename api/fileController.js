import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export function readJson(fileName) {
  return async ctx => {
    try {
      const file = await readFileAsync(path.join(process.cwd(), `${fileName}.json`));
      ctx.response.body = JSON.parse(file);
    } catch(error) {
      ctx.response.body = {};
    }
  }
}

export function writeJson(fileName) {
  return async ctx => {
    const jsonData = ctx.request.body;
    try {
      await writeFileAsync(path.join(process.cwd(), `${fileName}.json`), JSON.stringify(jsonData));
      ctx.response.status = 200;
    } catch(error) {
      ctx.response.status = 500;
      ctx.response.body = {};
    }
  }
}
