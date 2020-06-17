import { Request, Response } from "express";
import { Technical } from "../models/technical";

export class TechnicalController {

    constructor() { }

    public async getTechnicals( req: Request, res: Response ) {

        Technical.find().then( technical => {

            res.json({
                ok: true,
                message: 'get technical success',
                technical: technical
            })
            if ( !technical ) {
                res.json({
                    ok: false,
                    message: 'there arent service'
                })
            }
        }).catch( err => {

            res.json({
                ok: false,
                message: 'get service failed'
            })

        })

    }

    public async getTechnicalById( req: Request, res: Response ) {

        var technicalId = req.params.id;
        Technical.findById( technicalId, function( err, technicalBD ) {

            if ( err ) { throw err; }
            if( !technicalBD ) {
                res.json({
                    ok: false,
                    status: 401,
                    message: 'technical dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    message: 'get technical success',
                    technical: technicalBD
                })
            }

        })

    }

    public async createTechnical( req: Request, res: Response ) {

        const body = req.body;

        const technical = {
            nameTechnical: body. nameTechnical,
            lastNameTechnical: body.lastNameTechnical,
            document: body.document,
            email: body.email,
            phone: body.phone,
            specialty: body.specialty,
        };
    
        await Technical.create( technical ).then( technicalDB => {

            res.json({
                ok: true,
                technical: technicalDB
            });

        }).catch( err => {
            res.json({
                ok: false,
                err
            })
        });
    }

    public async updateTechnical( req: any, res: Response ) {

        var technicalId = req.params.id;
        const user = req.user.id;
        var body = req.body;                

        const technicalUpdate = {
            nameTechnical: body.nameTechnical,
            lastNameTechnical: body.lastNameTechnical,
            document: body.document,
            email: body.email,
            phone: body.phone,
            specialty: body.specialty,
            user: user
        }

        Technical.findByIdAndUpdate( technicalId, technicalUpdate, { new: true }, ( err, technicalDB ) => {

            if ( err ) throw err;

            if ( !technicalDB ) {
                res.json({
                    ok: false,
                    message: 'this technical dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'upload technical success',
                    technical: technicalDB
                })
            }

        });

    }

    public async deleteTechnical( req: any, res: Response ) {

        var technicalId = req.params.id;
        await Technical.findByIdAndDelete( technicalId, ( err, technicalDB ) => {

            if ( err ) { throw err; }
            if ( !technicalDB ) {
                res.json({
                    ok: false,
                    message: 'this technical dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'delete technical success'
                }) 
            }

        });
    }

}