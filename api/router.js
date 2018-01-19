import express from 'express';
import { readJson, writeJson } from './jsonController';
import { saveImage } from './imageController';

const router = express.Router();

router.route('/structure')
  .get(readJson('structure'));

router.route('/content')
  .get(readJson('content'))
  .post(writeJson('content'));

router.route('/images')
  .post(saveImage);

/* serve static images with express -> on build move images to public/images */

export default router;
