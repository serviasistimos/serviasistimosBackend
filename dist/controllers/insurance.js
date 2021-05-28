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
exports.InsuranceController = void 0;
const insurance_1 = require("../models/insurance");
class InsuranceController {
    constructor() { }
    getInsurances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            insurance_1.Insurance.find().then(insurances => {
                res.json({
                    ok: true,
                    message: 'get insurances success',
                    insurance: insurances
                });
                if (!insurances) {
                    res.json({
                        ok: false,
                        message: 'there arent insurance'
                    });
                }
            }).catch(err => {
                res.json({
                    ok: false,
                    message: 'get insurance failed'
                });
            });
        });
    }
    getInsuranceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var insuranceId = req.params.id;
            insurance_1.Insurance.findById(insuranceId, function (err, insuranceBD) {
                if (err) {
                    throw err;
                }
                if (!insuranceBD) {
                    res.json({
                        ok: false,
                        status: 401,
                        message: 'Insurance dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200,
                        message: 'get Insurance success',
                        Insurance: insuranceBD
                    });
                }
            });
        });
    }
    createInsurance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const insurance = {
                nameInsurance: body.nameInsurance
            };
            yield insurance_1.Insurance.create(insurance).then(insuranceDB => {
                res.json({
                    ok: true,
                    insurance: insuranceDB
                });
            }).catch(err => {
                res.json({
                    ok: false,
                    err
                });
            });
        });
    }
    updateInsurance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var insuranceId = req.params.id;
            var body = req.body;
            const insuranceUpdate = {
                nameInsurance: body.nameInsurance
            };
            insurance_1.Insurance.findByIdAndUpdate(insuranceId, insuranceUpdate, { new: true }, (err, insuranceDB) => {
                if (err)
                    throw err;
                if (!insuranceDB) {
                    res.json({
                        ok: false,
                        message: 'this insurance dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'upload insurance success',
                        insurance: insuranceDB
                    });
                }
            });
        });
    }
    deleteInsurance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var insuranceId = req.params.id;
            yield insurance_1.Insurance.findByIdAndDelete(insuranceId, (err, insuranceDB) => {
                if (err) {
                    throw err;
                }
                if (!insuranceDB) {
                    res.json({
                        ok: false,
                        message: 'this insurance dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'delete insurance success'
                    });
                }
            });
        });
    }
}
exports.InsuranceController = InsuranceController;
