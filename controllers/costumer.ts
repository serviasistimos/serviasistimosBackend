import { Request, Response } from "express";
import { Costumer } from "../models/costumer";

export class CostumerController {

    constructor() { }

    public async getCostumers( req: Request, res: Response ) {

        Costumer.find().then( costumers => {

            res.json({
                ok: true,
                message: 'get costumers success',
                costumers: costumers
            })
            if ( !costumers ) {
                res.json({
                    ok: false,
                    message: 'there arent costumers'
                })
            }
        }).catch( err => {

            res.json({
                ok: false,
                message: 'get costumers failed'
            })

        })

    }

    public async getCostumerById( req: Request, res: Response ) {

        var costumerId = req.params.id;
        Costumer.findById( costumerId, function( err, costumerBD ) {

            if ( err ) { throw err; }
            if( !costumerBD ) {
                res.json({
                    ok: false,
                    status: 401,
                    message: 'costumer dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    message: 'get costumer success',
                    costumer: costumerBD
                })
            }

        })

    }

    public async createCostumer( req: Request, res: Response ) {

        const body = req.body;

        const costumer = {
            nameCostumer: body.nameCostumer,
            phone: body.phone,
            address: body.address,
            city: body.city,
            department: body.department
        };
    
        await Costumer.create( costumer ).then( costumerDB => {

            res.json({
                ok: true,
                costumer: costumerDB
            });

        }).catch( err => {
            res.json({
                ok: false,
                err
            })
        });
    }

    public async updateCostumer( req: any, res: Response ) {

        var costumerId = req.params.id;
        var body = req.body;                

        const costumerUpdate = {
            nameCostumer: body.nameCostumer,
            phone       : body.phone,
            address     : body.address,
            city        : body.city, 
            department  : body.department
        }

        Costumer.findByIdAndUpdate( costumerId, costumerUpdate, { new: true }, ( err, costumerDB ) => {

            if ( err ) throw err;

            if ( !costumerDB ) {
                res.json({
                    ok: false,
                    message: 'this costumer dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'upload costumer success',
                    costumer: costumerDB
                })
            }

        });

    }

    public async deleteCostumer( req: any, res: Response ) {

        var costumerId = req.params.id;
        await Costumer.findByIdAndDelete( costumerId, ( err, costumerDB ) => {

            if ( err ) { throw err; }
            if ( !costumerDB ) {
                res.json({
                    ok: false,
                    message: 'this costumer dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'delete costumer success'
                }) 
            }

        });
    }

}