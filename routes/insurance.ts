import { Router, Request, Response } from "express";
import { InsuranceController } from '../controllers/insurance';
import { verifyToken } from "../middlewares/authentication";


const insuranceRoutes = Router();
const insuranceController = new InsuranceController();

insuranceRoutes.post('/createInsurance', verifyToken, ( req: Request, res: Response ) => { insuranceController.createInsurance(req, res) });
insuranceRoutes.put('/updateInsurance/:id', verifyToken, ( req: Request, res: Response ) => { insuranceController.updateInsurance(req, res) });
insuranceRoutes.delete('/deleteInsurance/:id', verifyToken, ( req: Request, res: Response ) => { insuranceController.deleteInsurance(req, res) });
insuranceRoutes.get('/insurances', verifyToken, ( req: Request, res: Response ) => { insuranceController.getInsurances(req, res) });
insuranceRoutes.get('/insurance/:id', verifyToken, ( req: Request, res: Response ) => { insuranceController.getInsuranceById(req, res) });

export default 
    insuranceRoutes;