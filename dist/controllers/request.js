"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../models/request");
const service_1 = require("../models/service");
const technical_1 = require("../models/technical");
const costumer_1 = require("../models/costumer");
const requestCommentary_1 = require("../models/requestCommentary");
const insurance_1 = require("../models/insurance");
class RequestController {
    constructor() { }
    createRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield request_1.Requests.create(request).then((requestDB) => __awaiter(this, void 0, void 0, function* () {
                yield requestDB.populate('user', '-password').execPopulate();
                yield service_1.Service.findById(request.service, function (err, serviceBD) {
                    technical_1.Technical.findById(request.technical, function (err, technicalBD) {
                        costumer_1.Costumer.findById(request.costumer, function (err, costumerBD) {
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
            })).catch(err => {
                res.json({
                    ok: false,
                    err
                });
            });
        });
    }
    getRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = Number(req.query.page) || 1;
            let skip = page - 1;
            skip = skip * 10;
            const request = yield request_1.Requests.find()
                .sort({ _id: -1 })
                .limit(10)
                .skip(skip)
                .populate('user', '-password')
                .exec();
            res.json({
                ok: true,
                page: page,
                request
            });
        });
    }
    getRequestById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var requestId = req.params.id;
            request_1.Requests.findById(requestId, function (err, requestBD) {
                if (err) {
                    throw err;
                }
                if (!requestBD) {
                    res.json({
                        ok: false,
                        status: 401,
                        message: 'request dont exist'
                    });
                }
                else if (requestBD) {
                    service_1.Service.findById(requestBD.service, function (err, serviceBD) {
                        technical_1.Technical.findById(requestBD.technical, function (err, technicalBD) {
                            costumer_1.Costumer.findById(requestBD.costumer, function (err, costumerBD) {
                                insurance_1.Insurance.findById(requestBD.insurance, function (err, insuranceBD) {
                                    requestCommentary_1.RequestCommentary.find({ request: requestId })
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
                                                message: 'get request success'
                                            });
                                        }
                                        else {
                                            res.json({
                                                ok: true,
                                                status: 200,
                                                request: requestBD,
                                                commentaries: 'there arent commentaries in this request',
                                                service: serviceBD,
                                                technical: technicalBD,
                                                costumer: costumerBD,
                                                insurance: insuranceBD,
                                                message: 'get request success'
                                            });
                                        }
                                    });
                                });
                            });
                        });
                    });
                }
            });
        });
    }
    updateRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            };
            request_1.Requests.findByIdAndUpdate(requestId, requestUpdate, { new: true }, (err, requestDB) => {
                if (err)
                    throw err;
                if (!requestDB) {
                    res.json({
                        ok: false,
                        message: 'this request dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'upload request success',
                        request: requestDB
                    });
                }
            });
        });
    }
    deleteRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var requestId = req.params.id;
            yield request_1.Requests.findByIdAndDelete(requestId, (err, requestDB) => {
                if (err) {
                    throw err;
                }
                if (!requestDB) {
                    res.json({
                        ok: false,
                        message: 'this request dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'delete request success'
                    });
                }
            });
        });
    }
}
exports.RequestController = RequestController;
