import { Request, Response } from "express";
import { RequestCommentary } from "../models/requestCommentary";


export class RequestCommentaryController {

    constructor() { }

    public async getRequestCommentarys( req: Request, res: Response ) {

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