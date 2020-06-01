import { Router, Request, Response } from "express";
import { RequestController } from '../controllers/request';
import { verifyToken } from "../middlewares/authentication";


const RequestRoutes = Router();
const requestController = new RequestController();

RequestRoutes.post('/createRequest', [ verifyToken ], ( req: Request, res: Response ) => {requestController.createRequest(req, res) });
RequestRoutes.get('/getRequests', [ verifyToken ], ( req: Request, res: Response ) => {requestController.getRequest(req, res) });

export default
    RequestRoutes;