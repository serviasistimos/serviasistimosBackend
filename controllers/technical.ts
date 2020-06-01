import { Request, Response } from "express";
import { Technical } from "../models/technical";

export class TechnicalController {

    constructor() { }

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

}