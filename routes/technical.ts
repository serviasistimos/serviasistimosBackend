import { Router, Request, Response } from "express";
import { TechnicalController } from '../controllers/technical';
import { verifyToken } from "../middlewares/authentication";


const TechnicalRoutes = Router();
const technicalController = new TechnicalController();

TechnicalRoutes.post('/createTechnical', verifyToken, ( req: Request, res: Response ) => { technicalController.createTechnical(req, res) });

export default 
    TechnicalRoutes;