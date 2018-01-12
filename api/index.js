import 'babel-polyfill';
import Koa from 'koa';
import router from './router';

const app = new Koa();
const PORT = 3010;

app.use(router.routes());
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
