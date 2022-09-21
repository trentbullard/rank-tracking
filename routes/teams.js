import express from 'express';
import controller from '../controllers/index.js';
const { get, create, update, remove } = controller.teams;

const teamsRouter = express.Router();

teamsRouter.get('/', get);
teamsRouter.post('/', create);
teamsRouter.put('/:id', update);
teamsRouter.delete('/:id', remove);

export default teamsRouter;
