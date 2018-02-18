import { promisify } from 'util';
import { spawn } from 'child_process';
import express from 'express';
import { readJson, writeJson } from './fileController';

const router = express.Router();

router.route('/structure')
  .get(readJson('structure'));

router.route('/content')
  .get(readJson('content'))
  .post(writeJson('content'));

router.route('/build')
  .post((req, res) => {
    const child = spawn('yarn', ['build'], { cwd: process.cwd() });

    child.stderr.on('data', (data) => console.log(data.toString()));

    child.stdout.on('data', (data) => console.log(data.toString()));
    child.on('close', (code) => {
      if (code !== 0) {
        return res.sendStatus(500);
      }

      res.sendStatus(200);
    });
  });

export default router;
