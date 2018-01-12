import Router from 'koa-router';
import { readJson } from './fileController';
const router = new Router();

router.get('/structure', readJson('structure'));
router.get('/content', readJson('content'));

export default router;
