import {Router} from "express";
import * as stellplaetzeController from "../controllers/stellplaetzeController.js";

const stellplaetzeRouter = Router();

stellplaetzeRouter.route('/')
    .get(stellplaetzeController.getStellplaetze)
    .post(stellplaetzeController.createStellplatz)

stellplaetzeRouter.route('/:id')
    .delete(stellplaetzeController.deleteStellplatz)

export default stellplaetzeRouter;