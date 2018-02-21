import express from 'express';
import { authenticate, login } from './authService';
import { readJson, writeJson } from './fileController';

const router = express.Router();

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

export default router;
