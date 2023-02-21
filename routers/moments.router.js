import {Router} from "express";
import MomentsController from "../controllers/moments.controller.js";
import checkAuth from "../midleware/checkAuth.js";

const momentsRouter = new Router();

momentsRouter.get('/', MomentsController.getAllMoment);
momentsRouter.get('/:id', MomentsController.getOneMoment);
momentsRouter.post('/', checkAuth, MomentsController.createMoment);
momentsRouter.delete('/:id', checkAuth, MomentsController.removeMoment);
momentsRouter.put('/', checkAuth, MomentsController.updateMoment);

export default momentsRouter;