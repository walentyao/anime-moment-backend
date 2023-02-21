import {Router} from "express";
import checkAuth from "../midleware/checkAuth.js";
import UsersController from "../controllers/users.controller.js";

const usersRouter = new Router();

usersRouter.post('/login',UsersController.login);
usersRouter.post('/register',UsersController.register);
usersRouter.get('/me', checkAuth, UsersController.getInfoUser);

export default usersRouter;