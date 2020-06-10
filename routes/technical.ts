import { Router, Request, Response } from "express";
import { TechnicalController } from '../controllers/technical';
import { verifyToken } from "../middlewares/authentication";


const technicalRoutes = Router();
const technicalController = new TechnicalController();

technicalRoutes.post('/createTechnical', verifyToken, ( req: Request, res: Response ) => { technicalController.createTechnical(req, res) });

export default 
    technicalRoutes;