import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { init } from './authService';
import router from './router';

const imageDirectory = path.join(process.cwd(), 'public', 'images');

module.exports = function run() {
  const app = express();
  const PORT = 3010;

  app.use(init());
  app.use(bodyParser.json());
  app.use(cors());
  app.use(fileUpload());

  app.use('/api', router);
  app.use('/', express.static(path.join(__dirname, 'cms')));
  app.use('/images', express.static(imageDirectory));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'cms', 'index.html')));


  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
};
