import { Request, Response } from "express";
import { Service } from "../models/service";

export class ServiceController {

    constructor() { }

    public async getServices( req: Request, res: Response ) {

        Service.find().then( services => {

            res.json({
                ok: true,
                message: 'get services success',
                services: services
            })
            if ( !services ) {
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

    public async getServiceById( req: Request, res: Response ) {

        var serviceId = req.params.id;
        Service.findById( serviceId, function( err, serviceBD ) {

            if ( err ) { throw err; }
            if( !serviceBD ) {
                res.json({
                    ok: false,
                    status: 401,
                    message: 'service dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    message: 'get service success',
                    service: serviceBD
                })
            }

        })

    }

    public async createService( req: any, res: Response ) {

        const body = req.body;
        const user = req.user.id;

        const technical = {
        commentary: body.commentary,
        nameService: body.nameService,
        user: user
        };

    
        await Service.create( technical ).then( async serviceDB => {

            await serviceDB.populate('user', '-password').execPopulate();

            res.json({
                ok: true,
                service: serviceDB
            });

        }).catch( err => {
            res.json({
                ok: false,
                err
            })
        });
    }

    public async updateService( req: any, res: Response ) {

        var serviceId = req.params.id;
        const user = req.user.id;
        var body = req.body;                

        const serviceUpdate = {
            commentary: body.commentary,
            nameService: body.nameService,
            user: user
        }

        Service.findByIdAndUpdate( serviceId, serviceUpdate, { new: true }, ( err, serviceDB ) => {

            if ( err ) throw err;

            if ( !serviceDB ) {
                res.json({
                    ok: false,
                    message: 'this service dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'upload service success',
                    service: serviceDB
                })
            }

        });

    }

    public async deleteService( req: any, res: Response ) {

        var serviceId = req.params.id;
        await Service.findByIdAndDelete( serviceId, ( err, serviceDB ) => {

            if ( err ) { throw err; }
            if ( !serviceDB ) {
                res.json({
                    ok: false,
                    message: 'this service dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'delete service success'
                }) 
            }

        });
    }

}