import express from 'express';
import controller from '../controllers/index.js';
const { get, create, update, remove } = controller.games;

const gamesRouter = express.Router();

gamesRouter.get('/', get);
gamesRouter.post('/', create);
gamesRouter.put('/:id', update);
gamesRouter.delete('/:id', remove);

export default gamesRouter;
