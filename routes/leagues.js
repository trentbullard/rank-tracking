import express from 'express';
import controller from '../controllers/index.js';
const { get, create, update, remove } = controller.leagues;

const leaguesRouter = express.Router();

leaguesRouter.get('/', get);
leaguesRouter.post('/', create);
leaguesRouter.put('/:id', update);
leaguesRouter.delete('/:id', remove);

export default leaguesRouter;
