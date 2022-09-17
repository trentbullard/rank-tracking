import express from 'express';
import controller from '../controllers/index.js';
const { get, create, update, remove } = controller.users;

const usersRouter = express.Router();

usersRouter.get('/', get);
usersRouter.post('/', create);
usersRouter.put('/:id', update);
usersRouter.delete('/:id', remove);

export default usersRouter;
