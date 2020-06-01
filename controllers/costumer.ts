import { Request, Response } from "express";
import { Costumer } from "../models/costumer";

export class CostumerController {

    constructor() { }

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

}