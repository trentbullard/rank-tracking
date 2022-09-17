import express from 'express';
import controller from '../controllers/index.js';
const { getAuth, getSession, socialLogin, signup } = controller.auth;

const authRouter = express.Router();

authRouter.get('/', getAuth);
authRouter.get('/session', getSession);
authRouter.post('/social', socialLogin);
authRouter.post('/signup', signup);

export default authRouter;
