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
const insuranceCostumer_1 = require("../models/insuranceCostumer");
class InsuranceCostumerController {
    constructor() { }
    getInsurancesCostumers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            insuranceCostumer_1.InsuranceCostumer.find().then(insurancesCostumers => {
                res.json({
                    ok: true,
                    message: 'get insurancesCostumers success',
                    insurancesCostumers: insurancesCostumers
                });
                if (!insurancesCostumers) {
                    res.json({
                        ok: false,
                        message: 'there arent insurancesCostumers'
                    });
                }
            }).catch(err => {
                res.json({
                    ok: false,
                    message: 'get insurancesCostumers failed'
                });
            });
        });
    }
    getInsuranceCostumerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var insurancesCostumersId = req.params.id;
            insuranceCostumer_1.InsuranceCostumer.findById(insurancesCostumersId, function (err, insuranceCostumerBD) {
                if (err) {
                    throw err;
                }
                if (!insuranceCostumerBD) {
                    res.json({
                        ok: false,
                        status: 401,
                        message: 'insuranceCostumer dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200,
                        message: 'get insuranceCostumer success',
                        insuranceCostumer: insuranceCostumerBD
                    });
                }
            });
        });
    }
    createInsuranceCostumer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const insuranceCostumer = {
                costumer: body.costumerId,
                insurance: body.insuranceId
            };
            yield insuranceCostumer_1.InsuranceCostumer.create(insuranceCostumer).then(insuranceCostumerDB => {
                res.json({
                    ok: true,
                    insuranceCostumer: insuranceCostumerDB
                });
            }).catch(err => {
                res.json({
                    ok: false,
                    err
                });
            });
        });
    }
    updateInsuranceCostumer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var insuranceCostumerId = req.params.id;
            var body = req.body;
            const insuranceCostumerUpdate = {
                nameInsurance: body.nameInsurance
            };
            insuranceCostumer_1.InsuranceCostumer.findByIdAndUpdate(insuranceCostumerId, insuranceCostumerUpdate, { new: true }, (err, insuranceCostumerDB) => {
                if (err)
                    throw err;
                if (!insuranceCostumerDB) {
                    res.json({
                        ok: false,
                        message: 'this insuranceCostumer dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'upload insuranceCostumer success',
                        insuranceCostumer: insuranceCostumerDB
                    });
                }
            });
        });
    }
    deleteInsuranceCostumer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var insuranceCostumerId = req.params.id;
            yield insuranceCostumer_1.InsuranceCostumer.findByIdAndDelete(insuranceCostumerId, (err, insuranceCostumerDB) => {
                if (err) {
                    throw err;
                }
                if (!insuranceCostumerDB) {
                    res.json({
                        ok: false,
                        message: 'this insuranceCostumer dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'delete insuranceCostumer success'
                    });
                }
            });
        });
    }
}
exports.InsuranceCostumerController = InsuranceCostumerController;
