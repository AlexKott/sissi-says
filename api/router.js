import express from 'express';
import path from 'path';
import { readJson, writeJson } from './jsonController';
import { saveImage } from './imageController';

const router = express.Router();
const imageDirectory = path.join(process.cwd(), 'images');

router.route('/structure')
  .get(readJson('structure'));

router.route('/content')
  .get(readJson('content'))
  .post(writeJson('content'));

router.route('/images')
  .post(saveImage);

router.use('/images', express.static(imageDirectory));

export default router;
