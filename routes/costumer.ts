import { Router, Request, Response } from "express";
import { CostumerController } from '../controllers/costumer';
import { verifyToken } from "../middlewares/authentication";


const costumerRoutes = Router();
const costumerController = new CostumerController();

costumerRoutes.post('/createCostumer', verifyToken, ( req: Request, res: Response ) => { costumerController.createCostumer(req, res) });

export default 
    costumerRoutes;