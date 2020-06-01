import { Request, Response } from "express";
import { Service } from "../models/service";

export class ServiceController {

    constructor() { }

    public async createService( req: any, res: Response ) {

        const body = req.body;
        const user = req.user.id;

        const technical = {
        valueMaterials: body.valueMaterials,
        valueAsistimos: body.valueAsistimos,
        valueCostumer: body.valueCostumer,
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

}