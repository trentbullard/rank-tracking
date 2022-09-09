import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
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
const port = process.env.PORT || 3002;

app.use(cors());
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

app.listen(port, () => console.log(`Listening on port ${port}`));
