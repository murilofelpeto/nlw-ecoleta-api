import express from 'express';
import PointsController from './controller/PointsController';
import ItemController from "./controller/ItemController";


const routes = express.Router();

const pointsController = new PointsController();
const itemController = new ItemController();

routes.get('/items', itemController.index);

routes.get('/points/:id', pointsController.show)
routes.get('/points', pointsController.index)
routes.post('/points', pointsController.create)


export default routes;