import express from 'express';
import controller from '../controllers/index.js';
import middleware from '../middleware/index.js';
const { signup, login, refresh, logout, me, googleOauth } = controller.auth;

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/oauth/google', googleOauth);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);
authRouter.get('/me', middleware.auth, me);

export default authRouter;
