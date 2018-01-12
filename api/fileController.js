import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

export function readJson(fileName) {
  return async ctx => {
    try {
      ctx.response.body = await readFileAsync(path.join(process.cwd(), `${fileName}.json`));
    } catch(error) {
      ctx.response.body = {};
    }
  }
}
