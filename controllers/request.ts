import { Request, Response } from "express";
import { Requests } from "../models/request";
import { Service } from "../models/service";
import { Technical } from "../models/technical";
import { Costumer } from "../models/costumer";

export class RequestController {

    constructor() { }

    public async createRequest( req: any, res: Response ) {

        const body = req.body;
        const user = req.user.id;

        const request = {
        valueMaterials: body.valueMaterials,
        valueAsistimos: body.valueAsistimos,
        valueCostumer: body.valueCostumer,
        reference: body.reference,
        phone: body.phone,
        address: body.address,
        city: body.city,
        department: body.department,
        state: body.state,
        costumer: body.costumer,
        service: body.service,
        technical: body.technical,
        user: user
        };
    
        await Requests.create( request ).then( async requestDB => {

            await requestDB.populate('user', '-password').execPopulate();

            await Service.findById( request.service, function( err, serviceBD ) {

                Technical.findById( request.technical, function( err, technicalBD ) {

                    Costumer.findById( request.costumer, function( err, costumerBD ) {

                        res.json({
                            ok: true,
                            request: requestDB,
                            service: serviceBD,
                            technical: technicalBD,
                            costumer: costumerBD
                        });

                    });
                });
            });

        }).catch( err => {
            res.json({
                ok: false,
                err
            })
        });
    }

    public async getRequest( req: any, res: Response ) {

        let page = Number( req.query.page ) || 1;
        let skip = page - 1;
        skip = skip * 10;

        const request = await Requests.find()
                                      .sort({ _id: -1 })
                                      .limit( 10 )
                                      .skip( skip )
                                      .populate('user', '-password')
                                      .exec();

        res.json({
            ok: true,
            page: page,
            request
        })

    }

    public async getRequestById( req: Request, res: Response ) {

        var requestId = req.params.id;
        Requests.findById( requestId, function( err, requestBD ) {

            if ( err ) { throw err; }
            if( !requestBD ) {
                res.json({
                    ok: false,
                    status: 401,
                    message: 'request dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    message: 'get request success',
                    request: requestBD
                })
            }

        })

    }

    public async updateRequest( req: any, res: Response ) {

        var requestId = req.params.id;
        const user = req.user.id;
        var body = req.body;                

        const requestUpdate = {
            valueMaterials: body.valueMaterials,
            valueAsistimos: body.valueAsistimos,
            valueCostumer: body.valueCostumer,
            reference: body.reference,
            phone: body.phone,
            address: body.address,
            city: body.city,
            department: body.department,
            state: body.state,
            costumer: body.costumer,
            service: body.service,
            technical: body.technical,
            user: user
        }

        Requests.findByIdAndUpdate( requestId, requestUpdate, { new: true }, ( err, requestDB ) => {

            if ( err ) throw err;

            if ( !requestDB ) {
                res.json({
                    ok: false,
                    message: 'this request dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'upload request success',
                    request: requestDB
                })
            }

        });

    }

    public async deleteRequest( req: any, res: Response ) {

        var requestId = req.params.id;
        await Requests.findByIdAndDelete( requestId, ( err, requestDB ) => {

            if ( err ) { throw err; }
            if ( !requestDB ) {
                res.json({
                    ok: false,
                    message: 'this request dont exist'
                })
            } else {
                res.json({
                    ok: true,
                    message: 'delete request success'
                }) 
            }

        });
    }

}