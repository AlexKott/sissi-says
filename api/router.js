import express from 'express';
import { readJson, writeJson } from './fileController';

const router = express.Router();

router.route('/structure')
  .get(readJson('structure'));

router.route('/content')
  .get(readJson('content'))
  .post(writeJson('content'));

export default router;
