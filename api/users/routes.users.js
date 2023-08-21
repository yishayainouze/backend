import express from 'express';
import  usersController from './controller.users.js';

const usersRouter = express.Router();

usersRouter.get('/',usersController.getAlllUsers)
usersRouter.post('/register', usersController.registerUser);
usersRouter.post('/login', usersController.loginUser);

export default usersRouter;

