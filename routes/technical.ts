import { Router, Request, Response } from "express";
import { TechnicalController } from '../controllers/technical';
import { verifyToken } from "../middlewares/authentication";


const technicalRoutes = Router();
const technicalController = new TechnicalController();

technicalRoutes.post('/createTechnical',  ( req: Request, res: Response ) => { technicalController.createTechnical(req, res) });
technicalRoutes.put('/updateTechnical/:id',  ( req: Request, res: Response ) => { technicalController.updateTechnical(req, res) });
technicalRoutes.delete('/deleteTechnical/:id',  ( req: Request, res: Response ) => { technicalController.deleteTechnical(req, res) });
technicalRoutes.get('/technicals',  ( req: Request, res: Response ) => { technicalController.getTechnicals(req, res) });
technicalRoutes.get('/technical/:id',  ( req: Request, res: Response ) => { technicalController.getTechnicalById(req, res) });

export default
    technicalRoutes;

    // no olvidar colocar de nuevo verifyToken a las rutas