import express from 'express';
import { usersController } from '../controllers/index.js';

const usersRouter = express.Router();

usersRouter.get('/', usersController.get);
usersRouter.post('/', usersController.create);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.remove);

export default usersRouter;
