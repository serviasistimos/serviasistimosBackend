import { Request, Response } from "express";
import { RequestCommentary } from "../models/requestCommentary";
import { User } from "../models/user";


export class RequestCommentaryController {

    constructor() { }

    public async getRequestCommentaries( req: Request, res: Response ) {

        RequestCommentary.find().then( requestCommentary => {

            res.json({
                ok: true,
                message: 'get RequestCommentary success',
                requestCommentary: requestCommentary
            })
            if ( !requestCommentary ) {
                res.json({
                    ok: false,
                    message: 'there arent requestCommentary'
                })
            }
        }).catch( err => {

            res.json({
                ok: false,
                message: 'get requestCommentary failed'
            })

        })

    }

    public getRequestCommentaryById( req: Request, res: Response ) {

        var commentaryId = req.params.id;
        RequestCommentary.findById( commentaryId, function( err, commentaryBD ) {

            if ( err ) { throw err; }
            if ( !commentaryBD ) {
                res.json({
                    ok: true,
                    status: 401,
                    message: 'this comentary dont exist'    
                })
            } else {
                User.findById( commentaryBD.user, function( err, userBD ) {
                    res.json({
                        ok: true,
                        status: 200,
                        commentary: commentaryBD,
                        user: userBD        
                    })
                })
            }

        })

    }


    public async createRequestCommentary( req: any, res: Response ) {

        const body = req.body;
        const user = req.user.id;

        const requestCommentary = {
            commentary  : body.commentary,
            request     : body.request,
            user        : user
        };

    
        await RequestCommentary.create( requestCommentary ).then( async requestCommentaryDB => {

            await requestCommentaryDB.populate('user', '-password').execPopulate();

            res.json({
                ok: true,
                requestCommentary: requestCommentaryDB
            });

        }).catch( err => {
            res.json({
                ok: false,
                err
            })
        });
    }

}