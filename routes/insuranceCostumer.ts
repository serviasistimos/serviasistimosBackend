import { Router, Request, Response } from "express";
import { InsuranceCostumerController } from '../controllers/insuranceCostumer';
import { verifyToken } from "../middlewares/authentication";


const insuranceCostumerRoutes = Router();
const insuranceCostumerController = new InsuranceCostumerController();

insuranceCostumerRoutes.post('/createInsuranceCostumer', verifyToken, ( req: Request, res: Response ) => { insuranceCostumerController.createInsuranceCostumer(req, res) });
insuranceCostumerRoutes.put('/updateInsuranceCostumer/:id', verifyToken, ( req: Request, res: Response ) => { insuranceCostumerController.updateInsuranceCostumer(req, res) });
insuranceCostumerRoutes.delete('/deleteInsuranceCostumer/:id', verifyToken, ( req: Request, res: Response ) => { insuranceCostumerController.deleteInsuranceCostumer(req, res) });
insuranceCostumerRoutes.get('/insurancesCostumers', verifyToken, ( req: Request, res: Response ) => { insuranceCostumerController.getInsurancesCostumers(req, res) });
insuranceCostumerRoutes.get('/insuranceCostumer/:id', verifyToken, ( req: Request, res: Response ) => { insuranceCostumerController.getInsuranceCostumerById(req, res) });

export default
    insuranceCostumerRoutes;