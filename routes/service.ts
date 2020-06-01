import { Router, Request, Response } from "express";
import { ServiceController } from '../controllers/service';
import { verifyToken } from "../middlewares/authentication";


const ServiceRoutes = Router();
const serviceController = new ServiceController();

ServiceRoutes.post('/createService', [ verifyToken ], ( req: Request, res: Response ) => { serviceController.createService(req, res) });

export default
    ServiceRoutes;