import 'babel-polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './router';

const app = express();
const PORT = 3010;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use('/', express.static(path.join(__dirname, '..', 'build')));

app.use('/', router);

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
