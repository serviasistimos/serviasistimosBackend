import { Request, Response } from "express";
import { Requests } from "../models/request";
import { Service } from "../models/service";
import { Technical } from "../models/technical";
import { Costumer } from "../models/costumer";
import { RequestCommentary } from "../models/requestCommentary";
import { Insurance } from "../models/insurance";
import { User } from "../models/user";


export class RequestController {

    constructor() { }

    public async createRequest(req: any, res: Response) {

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
            commentary: body.commentary,
            department: body.department,
            state: body.state,
            costumer: body.costumer,
            service: body.service,
            technical: body.technical,
            insurance: body.insurance,
            nameCostumer: body.nameCostumer,
            nameService: body.nameService,
            nameTechnical: body.nameTechnical,
            nameInsurance: body.nameInsurance,
            lastnameTechnical: body.lastnameTechnical,
            user: user
        };

        await Requests.create(request).then(async requestDB => {

            await requestDB.populate('user', '-password').execPopulate();

            await Service.findById(request.service, function (err, serviceBD) {

                Technical.findById(request.technical, function (err, technicalBD) {

                    Costumer.findById(request.costumer, function (err, costumerBD) {

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

        }).catch(err => {
            res.json({
                ok: false,
                err
            })
        });
    }

    public async getRequest(req: any, res: Response) {

        let page = Number(req.query.page) || 1;
        let skip = page - 1;
        skip = skip * 10;

        const request = await Requests.find()
            .sort({ _id: -1 })
            .limit(10)
            .skip(skip)
            .populate('user', '-password')
            .exec();

        res.json({
            ok: true,
            page: page,
            request
        })

    }

    public async getRequestById(req: any, res: Response) {

        var requestId = req.params.id;
        Requests.findById(requestId, function (err, requestBD) {

            if (err) { throw err; }
            if (!requestBD) {
                res.json({
                    ok: false,
                    status: 401,
                    message: 'request dont exist'
                })
            } else if (requestBD) {

                Service.findById(requestBD.service, function (err, serviceBD) {
                    Technical.findById(requestBD.technical, function (err, technicalBD) {
                        Costumer.findById(requestBD.costumer, function (err, costumerBD) {
                            Insurance.findById(requestBD.insurance, function (err, insuranceBD) {
                                User.findById(requestBD.user, function (err, userBD) {
                                    RequestCommentary.find({ request: requestId })
                                        .then(commentaries => {
                                            if (commentaries.length > 0) {

                                                res.json({
                                                    ok: true,
                                                    status: 200,
                                                    request: requestBD,
                                                    commentaries: commentaries,
                                                    service: serviceBD,
                                                    technical: technicalBD,
                                                    costumer: costumerBD,
                                                    insurance: insuranceBD,
                                                    user: userBD,
                                                    message: 'get request success'
                                                })

                                            } else {
                                                res.json({
                                                    ok: true,
                                                    status: 200,
                                                    request: requestBD,
                                                    commentaries: 'there arent commentaries in this request',
                                                    service: serviceBD,
                                                    technical: technicalBD,
                                                    costumer: costumerBD,
                                                    insurance: insuranceBD,
                                                    user: userBD,
                                                    message: 'get request success'
                                                })
                                            }

                                        })
                                })
                            });
                        });
                    });
                });
            }
        })
    }

    public async updateRequest(req: any, res: Response) {

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
            commentary: body.commentary,
            department: body.department,
            state: body.state,
            costumer: body.costumer,
            service: body.service,
            technical: body.technical,
            insurance: body.insurance,
            nameCostumer: body.nameCostumer,
            nameService: body.nameService,
            nameTechnical: body.nameTechnical,
            nameInsurance: body.nameInsurance,
            lastnameTechnical: body.lastnameTechnical,
            user: user
        }

        Requests.findByIdAndUpdate(requestId, requestUpdate, { new: true }, (err, requestDB) => {

            if (err) throw err;

            if (!requestDB) {
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

    public async deleteRequest(req: any, res: Response) {

        var requestId = req.params.id;
        await Requests.findByIdAndDelete(requestId, (err, requestDB) => {

            if (err) { throw err; }
            if (!requestDB) {
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