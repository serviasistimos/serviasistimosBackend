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
const insurance_1 = require("../models/insurance");
class InsuranceController {
    constructor() { }
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
}
exports.InsuranceController = InsuranceController;
