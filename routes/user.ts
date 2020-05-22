import { Router, Request, Response } from "express";
import { UserController } from '../controllers/user';
import { verifyToken } from "../middlewares/authentication";
import { User } from "../models/user";
import Token from "../classes/token";


const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/create', ( req: Request, res: Response ) => { userController.createUser(req, res) });
userRoutes.post('/login', ( req: Request, res: Response ) => { userController.login(req, res) });
userRoutes.post('/update', verifyToken, ( req: any, res: Response ) => { 

    const body = req.body;

    const user = {
        nickname: body.nickname || body.nickname,
        password: body.password || body.password,
        image: body.image || body.image
    }

    User.findByIdAndUpdate( req.user.id , user, { new: true }, ( err, userDB: any ) => {

        if ( err ) throw err;
        
        if ( !userDB ) {

            res.json({
                ok: false,
                message: 'there isnt any user with that ID'
            });

        }

        const tokenUser = Token.getJwtToken({

            id: userDB.id,
            name: userDB.name,
            lastName: userDB.lastName,
            document: userDB.document,
            email: userDB.email,
            nickname: userDB.nickname,
            image: userDB.image

        })

        res.json({
            ok: true,
            token: tokenUser,
            user: userDB
        });

    });

 });

export default 
    userRoutes;
