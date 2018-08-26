import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { init } from './authService';
import router from './router';

const imageDirectory = path.join(process.cwd(), 'public', 'images');

module.exports = function run(args, flags = {}) {
  const {
    port = 3010,
  } = flags;

  const app = express();

  app.use(init());
  app.use(bodyParser.json());
  app.use(cors());
  app.use(fileUpload());

  app.use('/api', router);
  app.use('/', express.static(path.join(__dirname, 'cms')));
  app.use('/images', express.static(imageDirectory));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'cms', 'index.html')));


  app.listen(port, () => console.log(`Visit the CMS at http://localhost:${port}`));
};
