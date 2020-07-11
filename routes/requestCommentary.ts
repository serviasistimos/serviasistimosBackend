import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/authentication";
import { RequestCommentaryController } from "../controllers/requestCommentary";


const requestCommentaryRoutes = Router();
const requestCommentaryController = new RequestCommentaryController();

requestCommentaryRoutes.post('/createRequestCommentary', [ verifyToken ], ( req: Request, res: Response ) => { requestCommentaryController.createRequestCommentary(req, res) });
requestCommentaryRoutes.get('/getRequestCommentaries', [ verifyToken ], ( req: Request, res: Response ) => { requestCommentaryController.getRequestCommentaries(req, res) });
requestCommentaryRoutes.get('/getRequestCommentaryById/:id', [ verifyToken ], ( req: Request, res: Response ) => { requestCommentaryController.getRequestCommentaryById(req, res) });

export default
requestCommentaryRoutes;