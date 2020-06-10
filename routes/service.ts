import { Router, Request, Response } from "express";
import { ServiceController } from '../controllers/service';
import { verifyToken } from "../middlewares/authentication";


const serviceRoutes = Router();
const serviceController = new ServiceController();

serviceRoutes.post('/createService', [ verifyToken ], ( req: Request, res: Response ) => { serviceController.createService(req, res) });

export default
    serviceRoutes;