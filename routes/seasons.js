import express from 'express';
import controller from '../controllers/index.js';
const { get, create, update, remove } = controller.seasons;

const seasonsRouter = express.Router();

seasonsRouter.get('/', get);
seasonsRouter.post('/', create);
seasonsRouter.put('/:id', update);
seasonsRouter.delete('/:id', remove);

export default seasonsRouter;
