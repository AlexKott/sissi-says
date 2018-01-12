import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Koa from 'koa';
import Router from 'koa-router';

const readFileAsync = promisify(fs.readFile);

const app = new Koa();
const router = new Router();

router.get('/structure', async (ctx, next) => {
  if (fs.existsSync(path.join(process.cwd(), 'structure.json'))) {
    const structureJson = await readFileAsync(path.join(process.cwd(), 'structure.json'));
    ctx.response.body = structureJson;
  } else {
    ctx.response.body = {
      errors: 'No structure file found!',
    };
  }
});

app.use(router.routes());

app.listen(3010);
