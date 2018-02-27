import express from 'express';
import path from 'path';

import { readJson, writeJson } from './jsonController';
import { saveImage } from './imageController';
import { authenticate, login } from './authService';

const router = express.Router();
const imageDirectory = path.join(process.cwd(), 'images');

router.route('/structure')
  .get(
    authenticate(),
    readJson('structure')
  );

router.route('/content')
  .get(
    authenticate(),
    readJson('content')
  )
  .post(
    authenticate(),
    writeJson('content')
  );

router.route('/login')
  .post((req, res) => {
    const { username, password } = req.body;
    let token;
    try {
      token = login(username, password);
    } catch(error) {
      return res.sendStatus(500);
    }

    if (!token) {
      return res.sendStatus(401);
    }

    res.status(200).send({ token });
  });

router.route('/images')
  .post(saveImage);

router.use('/images', express.static(imageDirectory));

export default router;
