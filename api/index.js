import 'babel-polyfill';
import Koa from 'koa';
import cors from 'koa-cors';
import koaBody from 'koa-body';
import router from './router';

const app = new Koa();
const PORT = 3010;

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(koaBody());
app.use(router.routes());
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
