import express from 'express';
import controller from '../controllers/index.js';
const { get, create, update, remove } = controller.matches;

const matchesRouter = express.Router();

matchesRouter.get('/', get);
matchesRouter.post('/', create);
matchesRouter.put('/:id', update);
matchesRouter.delete('/:id', remove);

export default matchesRouter;
