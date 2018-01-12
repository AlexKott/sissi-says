import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Koa from 'koa';
import Router from 'koa-router';

const readFileAsync = promisify(fs.readFile);
const existsAsync = promisify(fs.exists);

const app = new Koa();
const router = new Router();

router.get('/structure', async (ctx, next) => {
  const doesStructureExist = await existsAsync(path.join(process.cwd(), 'structure.json'));

  if (doesStructureExist) {
    const structureJson = await readFileAsync(path.join(process.cwd(), 'structure.json'));
    ctx.response.body = structureJson;
  } else {
    ctx.response.status = 404;
    ctx.response.body = {
      errors: 'No structure file found!',
    };
  }
});

app.use(router.routes());

app.listen(3010);
