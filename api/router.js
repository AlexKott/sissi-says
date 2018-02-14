import express from 'express';
import { readJson, writeJson } from './fileController';

const router = express.Router();

router.route('/structure')
  .get(readJson('structure'));

router.route('/content')
  .get(readJson('content'))
  .post(writeJson('content'));

router.route('/login')
  .post((req, res) => {
    const { username, password } = req.body;
    if (username === 'testUser' && password === '1234') {
      res.send({ token: 'abc123' });
    } else {
      res.sendStatus(401);
    }
  });

export default router;
