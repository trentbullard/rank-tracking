import express from 'express';
import controller from '../controllers/index.js';
const { get, create, update, remove } = controller.clubs;

const clubsRouter = express.Router();

clubsRouter.get('/', get);
clubsRouter.post('/', create);
clubsRouter.put('/:id', update);
clubsRouter.delete('/:id', remove);

export default clubsRouter;
