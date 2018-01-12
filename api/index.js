import 'babel-polyfill';
import Koa from 'koa';
import koaBody from 'koa-body';
import router from './router';

const app = new Koa();
const PORT = 3010;

app.use(koaBody());
app.use(router.routes());
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
