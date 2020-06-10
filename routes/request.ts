import { Router, Request, Response } from "express";
import { RequestController } from '../controllers/request';
import { verifyToken } from "../middlewares/authentication";


const requestRoutes = Router();
const requestController = new RequestController();

requestRoutes.post('/createRequest', [ verifyToken ], ( req: Request, res: Response ) => {requestController.createRequest(req, res) });
requestRoutes.get('/getRequests', [ verifyToken ], ( req: Request, res: Response ) => {requestController.getRequest(req, res) });

export default
    requestRoutes;