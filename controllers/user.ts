import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from 'bcryptjs';
import Token from "../classes/token";
import FileSystem from "../classes/fileSystem";

export class UserController {

    public fileSystem = new FileSystem();

    constructor() { }

    public async createUser( req: any, res: Response ) {
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
            res.json({
                ok: true,
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
                    password: userDB.password,
                    image: userDB.image
                });
                res.json({
                    ok: true,
                    token: tokenUser,
                    user: userDB
                });
            }
        });
    }

    public updateUser( req: any, res: Response ) {
        const body = req.body;
        const images = this.fileSystem.imagesSinceTempToPost( req.user.id );
        const user = {
            email: body.email || req.user.email,
            password: body.password ? bcrypt.hashSync(body.password, 10) : req.user.password,
            image: images || req.user.image
        }
        User.findByIdAndUpdate( req.user.id , user, { new: true }, ( err, userDB: any ) => {
            if ( err ) throw err;

            if ( !userDB ) {
                res.json({
                    ok: false,
                    message: 'there isnt any user with that ID'
                });
            }
            res.json({
                ok: true,
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

    public async showImage( req: any, res: Response ) {

        const userId = req.params.userId;
        const img = req.params.img;

        const pathPhoto = this.fileSystem.getFotoURL( userId, img );

        res.sendFile( pathPhoto );

    }

    public async getUserById( req: any, res: Response ) {
 
        var userId = req.params.id;
        User.findById(userId, function( err, user ) {

            if ( user ) {

                res.json({
                    ok: true,
                    status: 200,
                    message: 'get user successfull',
                    user: user
                })

            }

            if ( !user ) {
                res.json({
                    ok: false,
                    status: 401,
                    message: 'this user dont exist in the database'
                })
            }

            if ( err ) {

                res.json({
                    ok: false,
                    status: 500,
                    message: 'get user failed',
                    err: err
                })

            }
            

        })

    }

    public async getUsers( req: any, res: Response ) {

        User.find()
        .then( users => {

            res.json({
                ok: true,
                users: users
            });
            if ( !users ) {

                res.json({
                    ok: null,
                    message: 'there aren´t users registered'
                })

            }

        })
        .catch( err => {

            res.json({
                ok: false,
                err: err,
                message: 'get users failed'
            });

        });
    }

    public async deleteUser( req: any, res: Response ) {

        var userId = req.params.id;
        await User.findByIdAndDelete( userId, ( err, userDB ) => {

            if ( err ) { throw err; }
            if ( !userDB ) {
                res.json({
                    ok: false,
                    message: 'this User dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'delete User success'
                }) 
            }

        });
    }

}