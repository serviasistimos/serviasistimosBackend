import { Router, Request, Response } from "express";
import { ServiceController } from '../controllers/service';
import { verifyToken } from "../middlewares/authentication";


const serviceRoutes = Router();
const serviceController = new ServiceController();

serviceRoutes.post('/createService', [ verifyToken ], ( req: Request, res: Response ) => { serviceController.createService(req, res) });
serviceRoutes.put('/updateService/:id', verifyToken, ( req: Request, res: Response ) => { serviceController.updateService(req, res) });
serviceRoutes.delete('/deleteService/:id', verifyToken, ( req: Request, res: Response ) => { serviceController.deleteService(req, res) });
serviceRoutes.get('/services', verifyToken, ( req: Request, res: Response ) => { serviceController.getServices(req, res) });
serviceRoutes.get('/service/:id', verifyToken, ( req: Request, res: Response ) => { serviceController.getServiceById(req, res) });

export default
    serviceRoutes;