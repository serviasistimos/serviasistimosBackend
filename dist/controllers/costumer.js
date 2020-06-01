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
const costumer_1 = require("../models/costumer");
class CostumerController {
    constructor() { }
    createCostumer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const costumer = {
                nameCostumer: body.nameCostumer,
                phone: body.phone,
                address: body.address,
                city: body.city,
                department: body.department
            };
            yield costumer_1.Costumer.create(costumer).then(costumerDB => {
                res.json({
                    ok: true,
                    costumer: costumerDB
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
exports.CostumerController = CostumerController;
