import express from 'express';
import controller from '../controllers/index.js';
const { get, create, update, remove } = controller.sets;

const setsRouter = express.Router();

setsRouter.get('/', get);
setsRouter.post('/', create);
setsRouter.put('/:id', update);
setsRouter.delete('/:id', remove);

export default setsRouter;
