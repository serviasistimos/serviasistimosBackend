import { Router, Request, Response } from "express";
import { UserController } from '../controllers/user';
import { verifyToken } from "../middlewares/authentication";


const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/create', ( req: Request, res: Response ) => { userController.createUser(req, res) });
userRoutes.post('/login', ( req: Request, res: Response ) => { userController.login(req, res) });
userRoutes.post('/update', verifyToken, ( req: any, res: Response ) => { userController.updateUser(req, res) });
userRoutes.post('/uploadImage', verifyToken, ( req: any, res: Response ) => { userController.uploadImage(req, res) });
userRoutes.get('/image/:userId/:img', ( req: any, res: Response ) => { userController.showImage(req, res) });
userRoutes.get('/getUser', verifyToken, ( req: any, res: Response ) => { userController.getUser(req, res) });

export default 
    userRoutes;
