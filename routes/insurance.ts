import { Router, Request, Response } from "express";
import { InsuranceController } from '../controllers/insurance';
import { verifyToken } from "../middlewares/authentication";


const insuranceRoutes = Router();
const insuranceController = new InsuranceController();

insuranceRoutes.post('/createInsurance', verifyToken, ( req: Request, res: Response ) => { insuranceController.createInsurance(req, res) });

export default 
    insuranceRoutes;