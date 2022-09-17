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

app.get('/api', (req, res) => res.json({ message: 'ok' }));

app.use('/api/users', router.users);
app.use('/api/games', router.games);
app.use('/api/leagues', router.leagues);
app.use('/api/seasons', router.seasons);
app.use('/api/sports', router.sports);
app.use('/api/auth', router.auth);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  console.error(error.message, error.stack);
  res.status(status).json({ error: 'something went wrong' });
});

app.use(middleware.error404);

const port = process.env.PORT || 3002;
if (process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync(process.env.SSL_KEY, 'utf8');
  const certificate = fs.readFileSync(process.env.SSL_CERT, 'utf8');
  const ca = fs.readFileSync(process.env.SSL_CA, 'utf8');
  const credentials = { key: privateKey, cert: certificate, ca: ca };
  https.createServer(credentials, app).listen(port, () => {
    console.log(`Listening securely on port ${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};
