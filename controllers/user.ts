import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from 'bcrypt';
import Token from "../classes/token";

export class UserController {

    constructor() { }

    public async createUser( req: Request, res: Response ) {

        const body = req.body;

        const user = {
            name: body.name,
            lastName: body.lastName,
            document: body.document,
            role: body.role,
            email: body.email,
            nickname: body.nickname,
            password: bcrypt.hashSync(body.password, 10),
            image: body.image
        };
    
        await User.create( user ).then( userDB => {

            const tokenUser = Token.getJwtToken({

                id: userDB.id,
                name: userDB.name,
                lastName: userDB.lastName,
                document: userDB.document,
                email: userDB.email,
                image: userDB.image

            })

            res.json({
                ok: true,
                token: tokenUser,
                user: userDB
            });

        }).catch( err => {
            res.json({
                ok: false,
                err
            })
        });
    }

    public async login( req: Request, res: Response ) {

        const body = req.body;

        await User.findOne( {email: body.email}, ( err, userDB ) => {

            if ( err ) throw err;
            
            if ( !userDB ) {

                return res.json({
                    ok: false,
                    message: 'user/password invalid'
                });
                
            }

            if ( userDB.comparePassword( body.password ) ) {

                const tokenUser = Token.getJwtToken({

                    id: userDB.id,
                    name: userDB.name,
                    lastName: userDB.lastName,
                    document: userDB.document,
                    email: userDB.email,
                    image: userDB.image

                });

                res.json({
                    ok: true,
                    token: tokenUser
                });

            }else {

                return res.json({
                    ok: false,
                    message: 'user/password invalid ***'
                });

            }
        });
    }

    public updateUser( req: any, res: Response ) {

        const body = req.body;

        const user = {
            nickname: body.nickname || req.user.nickname,
            password: body.password || req.user.password,
            image: body.image || req.user.image
        }

        User.findByIdAndUpdate( req.user.id, user, { new: true }, ( err, userDB: any ) => {

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

            });

            res.json({
                ok: true,
                token: tokenUser,
                user: userDB
            });

        });

    }

}