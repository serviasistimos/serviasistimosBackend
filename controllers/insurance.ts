import { Request, Response } from "express";
import { Insurance } from "../models/insurance";
import bcrypt from 'bcrypt';
import Token from "../classes/token";

export class InsuranceController {

    constructor() { }

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

}