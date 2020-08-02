import { Router, Request, Response } from "express";
import { RequestController } from '../controllers/request';
import { verifyToken } from "../middlewares/authentication";


const requestRoutes = Router();
const requestController = new RequestController();

requestRoutes.post('/createRequest', [ verifyToken ], ( req: Request, res: Response ) => {requestController.createRequest(req, res) });
requestRoutes.get('/getRequests', [ verifyToken ], ( req: Request, res: Response ) => {requestController.getRequest(req, res) });
requestRoutes.get('/request/:id', verifyToken, ( req: Request, res: Response ) => { requestController.getRequestById(req, res) });
requestRoutes.put('/updateRequest/:id', verifyToken, ( req: Request, res: Response ) => { requestController.updateRequest(req, res) });
requestRoutes.delete('/deleteRequest/:id', verifyToken, ( req: Request, res: Response ) => { requestController.deleteRequest(req, res) });
requestRoutes.get('/technicalRequests/:id', verifyToken, ( req: Request, res: Response ) => { requestController.getAllRequestByTechnical(req, res) });

export default
    requestRoutes;