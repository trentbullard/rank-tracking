import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import https from 'https';
import dotenv from 'dotenv';
dotenv.config();

import Knex from 'knex';
import knexConfig from './knexfile.js';
import { Model } from 'objection';
const knex = Knex(knexConfig.development);
Model.knex(knex);

import router from './routes/index.js';
import middleware from './middleware/index.js';

const app = express();

const origins = JSON.parse(process.env.CORS_ORIGIN)
app.use(cors({
  origin: origins,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(middleware.log);
app.use(middleware.auth);

app.get('/', (req, res) => res.json({ message: 'ok' }));

app.use('/users', router.users);
app.use('/auth', router.auth);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  console.error(error.message, error.stack);
  res.status(status).json({ error: 'something went wrong' });
});

app.use(middleware.error404);

console.log('port', process.env.PORT);
console.log('secret', process.env.SECRET_KEY);
console.log('cors', process.env.CORS_ORIGIN);
console.log('key', process.env.SSL_KEY);
console.log('cert', process.env.SSL_CERT);
console.log('ca', process.env.SSL_CA);

const port = process.env.PORT || 3002;
const privateKey = fs.readFileSync(process.env.SSL_KEY, 'utf8');
const certificate = fs.readFileSync(process.env.SSL_CERT, 'utf8');
const ca = fs.readFileSync(process.env.SSL_CA, 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };
https.createServer(credentials, app).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
