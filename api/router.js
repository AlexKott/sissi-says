import Router from 'koa-router';
import { readJson, writeJson } from './fileController';
const router = new Router();

router.get('/structure', readJson('structure'));
router.get('/content', readJson('content'));

router.post('/content', writeJson('content'));

export default router;
