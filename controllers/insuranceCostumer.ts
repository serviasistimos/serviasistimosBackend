import { Request, Response } from "express";
import { InsuranceCostumer } from "../models/insuranceCostumer";

export class InsuranceCostumerController {

    constructor() { }

    public async getInsurancesCostumers( req: Request, res: Response ) {

        InsuranceCostumer.find().then( insurancesCostumers => {

            res.json({
                ok: true,
                message: 'get insurancesCostumers success',
                insurancesCostumers: insurancesCostumers
            })
            if ( !insurancesCostumers ) {
                res.json({
                    ok: false,
                    message: 'there arent insurancesCostumers'
                })
            }
        }).catch( err => {

            res.json({
                ok: false,
                message: 'get insurancesCostumers failed'
            })

        })

    }

    public async getInsuranceCostumerById( req: Request, res: Response ) {

        var insurancesCostumersId = req.params.id;
        InsuranceCostumer.findById( insurancesCostumersId, function( err, insuranceCostumerBD ) {

            if ( err ) { throw err; }
            if( !insuranceCostumerBD ) {
                res.json({
                    ok: false,
                    status: 401,
                    message: 'insuranceCostumer dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    message: 'get insuranceCostumer success',
                    insuranceCostumer: insuranceCostumerBD
                })
            }

        })

    }

    public async createInsuranceCostumer( req: Request, res: Response ) {

        const body = req.body;

        const insuranceCostumer = {
            costumer: body.costumerId,
            insurance: body.insuranceId
        };
    
        await InsuranceCostumer.create( insuranceCostumer ).then( insuranceCostumerDB => {

            res.json({
                ok: true,
                insuranceCostumer: insuranceCostumerDB
            });

        }).catch( err => {
            res.json({
                ok: false,
                err
            })
        });
    }

    public async updateInsuranceCostumer( req: any, res: Response ) {

        var insuranceCostumerId = req.params.id;
        var body = req.body;          

        const insuranceCostumerUpdate = {
            nameInsurance: body.nameInsurance
        }

        InsuranceCostumer.findByIdAndUpdate( insuranceCostumerId, insuranceCostumerUpdate, { new: true }, ( err, insuranceCostumerDB ) => {

            if ( err ) throw err;

            if ( !insuranceCostumerDB ) {
                res.json({
                    ok: false,
                    message: 'this insuranceCostumer dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'upload insuranceCostumer success',
                    insuranceCostumer: insuranceCostumerDB
                })
            }

        });

    }

    public async deleteInsuranceCostumer( req: any, res: Response ) {

        var insuranceCostumerId = req.params.id;
        await InsuranceCostumer.findByIdAndDelete( insuranceCostumerId, ( err, insuranceCostumerDB ) => {

            if ( err ) { throw err; }
            if ( !insuranceCostumerDB ) {
                res.json({
                    ok: false,
                    message: 'this insuranceCostumer dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'delete insuranceCostumer success'
                }) 
            }

        });
    }

}