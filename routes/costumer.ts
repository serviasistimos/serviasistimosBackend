import { Router, Request, Response } from "express";
import { CostumerController } from '../controllers/costumer';
import { verifyToken } from "../middlewares/authentication";


const costumerRoutes = Router();
const costumerController = new CostumerController();

costumerRoutes.post('/createCostumer', verifyToken, ( req: Request, res: Response ) => { costumerController.createCostumer(req, res) });
costumerRoutes.put('/updateCostumer/:id', verifyToken, ( req: Request, res: Response ) => { costumerController.updateCostumer(req, res) });
costumerRoutes.delete('/deleteCostumer/:id', verifyToken, ( req: Request, res: Response ) => { costumerController.deleteCostumer(req, res) });
costumerRoutes.get('/costumers', verifyToken, ( req: Request, res: Response ) => { costumerController.getCostumers(req, res) });
costumerRoutes.get('/costumer/:id', verifyToken, ( req: Request, res: Response ) => { costumerController.getCostumerById(req, res) });

export default 
    costumerRoutes;