import express from 'express';
import  usersController  from './controller.users';

const usersRouter = express.Router();

usersRouter.get('/',usersController.getAlllUsers)
usersRouter.get('/:id',usersController.getUserByID)
usersRouter.put('/:id',usersController.updateUserById)
usersRouter.post('/register', usersController.registerUser);
usersRouter.post('/login', usersController.loginUser);

export default usersRouter;

