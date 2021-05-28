import { Request, Response } from "express";
import { Insurance } from "../models/insurance";
import bcrypt from 'bcryptjs';
import Token from "../classes/token";

export class InsuranceController {

    constructor() { }

    public async getInsurances( req: Request, res: Response ) {

        Insurance.find().then( insurances => {

            res.json({
                ok: true,
                message: 'get insurances success',
                insurance: insurances
            })
            if ( !insurances ) {
                res.json({
                    ok: false,
                    message: 'there arent insurance'
                })
            }
        }).catch( err => {

            res.json({
                ok: false,
                message: 'get insurance failed'
            })

        })

    }

    public async getInsuranceById( req: Request, res: Response ) {

        var insuranceId = req.params.id;
        Insurance.findById( insuranceId, function( err, insuranceBD ) {

            if ( err ) { throw err; }
            if( !insuranceBD ) {
                res.json({
                    ok: false,
                    status: 401,
                    message: 'Insurance dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    message: 'get Insurance success',
                    Insurance: insuranceBD
                })
            }

        })

    }

    public async createInsurance( req: Request, res: Response ) {

        const body = req.body;

        const insurance = {
            nameInsurance: body.nameInsurance
        };
    
        await Insurance.create( insurance ).then( insuranceDB => {

            res.json({
                ok: true,
                insurance: insuranceDB
            });

        }).catch( err => {
            res.json({
                ok: false,
                err
            })
        });
    }

    public async updateInsurance( req: any, res: Response ) {

        var insuranceId = req.params.id;
        var body = req.body;                

        const insuranceUpdate = {
            nameInsurance: body.nameInsurance
        }

        Insurance.findByIdAndUpdate( insuranceId, insuranceUpdate, { new: true }, ( err, insuranceDB ) => {

            if ( err ) throw err;

            if ( !insuranceDB ) {
                res.json({
                    ok: false,
                    message: 'this insurance dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'upload insurance success',
                    insurance: insuranceDB
                })
            }

        });

    }

    public async deleteInsurance( req: any, res: Response ) {

        var insuranceId = req.params.id;
        await Insurance.findByIdAndDelete( insuranceId, ( err, insuranceDB ) => {

            if ( err ) { throw err; }
            if ( !insuranceDB ) {
                res.json({
                    ok: false,
                    message: 'this insurance dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'delete insurance success'
                }) 
            }

        });
    }

}