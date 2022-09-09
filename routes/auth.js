import express from 'express';
import controller from '../controllers/index.js';
const { getAuth, getSession, createSession, removeSession } = controller.auth;

const authRouter = express.Router();

authRouter.get('/', getAuth);
authRouter.get('/session', getSession);
authRouter.post('/login', createSession);
authRouter.delete('/logout', removeSession);

export default authRouter;
