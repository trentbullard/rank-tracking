import express from 'express';
import controller from '../controllers/index.js';
const { get, create, update, remove } = controller.sports;

const sportsRouter = express.Router();

sportsRouter.get('/', get);
sportsRouter.post('/', create);
sportsRouter.put('/:id', update);
sportsRouter.delete('/:id', remove);

export default sportsRouter;
