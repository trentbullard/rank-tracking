import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import https from 'https';
import cookieParser from 'cookie-parser';
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

const origins = process.env.CORS_ORIGIN ? JSON.parse(process.env.CORS_ORIGIN) : true;
app.use(cors({
  origin: origins,
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(middleware.log);

app.get('/api', (req, res) => res.json({ message: 'ok' }));

app.use('/api/auth', router.auth);
app.use('/api/users', middleware.auth, router.users);
app.use('/api/clubs', middleware.auth, router.clubs);
app.use('/api/sports', middleware.auth, router.sports);
app.use('/api/teams', middleware.auth, router.teams);
app.use('/api/leagues', middleware.auth, router.leagues);
app.use('/api/seasons', middleware.auth, router.seasons);
app.use('/api/matches', middleware.auth, router.matches);
app.use('/api/sets', middleware.auth, router.sets);
app.use('/api/games', middleware.auth, router.games);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  console.error(error.message, error.stack);
  res.status(status).json({ error: 'something went wrong' });
});

app.use(middleware.error404);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
