import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import FileSystem from "../classes/fileSystem";

export class UserController {

    public fileSystem = new FileSystem();

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
            email: body.email || body.email,
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

    }

    public async uploadImage( req: any, res: Response ) {

        if ( !req.files ) {

            return res.status(400).json({
                ok: false,
                message: 'there arent any file'
            })

        }

        const file = req.files.image;

        if ( !file ) {

            return res.status(400).json({
                ok: false,
                message: 'there arent any file uploaded'
            })

        }

        if ( !file.mimetype.includes('image') ) {

            return res.status(400).json({
                ok: false,
                message: 'this isnt a valid file'
            })

        }

        await this.fileSystem.saveImageTemp( file, req.user.id );

        res.json({
            ok: true,
            file
        })

    }

}