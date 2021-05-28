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
exports.CostumerController = void 0;
const costumer_1 = require("../models/costumer");
class CostumerController {
    constructor() { }
    getCostumers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            costumer_1.Costumer.find().then(costumers => {
                res.json({
                    ok: true,
                    message: 'get costumers success',
                    costumers: costumers
                });
                if (!costumers) {
                    res.json({
                        ok: false,
                        message: 'there arent costumers'
                    });
                }
            }).catch(err => {
                res.json({
                    ok: false,
                    message: 'get costumers failed'
                });
            });
        });
    }
    getCostumerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var costumerId = req.params.id;
            costumer_1.Costumer.findById(costumerId, function (err, costumerBD) {
                if (err) {
                    throw err;
                }
                if (!costumerBD) {
                    res.json({
                        ok: false,
                        status: 401,
                        message: 'costumer dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200,
                        message: 'get costumer success',
                        costumer: costumerBD
                    });
                }
            });
        });
    }
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
    updateCostumer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var costumerId = req.params.id;
            var body = req.body;
            const costumerUpdate = {
                nameCostumer: body.nameCostumer,
                phone: body.phone,
                address: body.address,
                city: body.city,
                department: body.department
            };
            costumer_1.Costumer.findByIdAndUpdate(costumerId, costumerUpdate, { new: true }, (err, costumerDB) => {
                if (err)
                    throw err;
                if (!costumerDB) {
                    res.json({
                        ok: false,
                        message: 'this costumer dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'upload costumer success',
                        costumer: costumerDB
                    });
                }
            });
        });
    }
    deleteCostumer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var costumerId = req.params.id;
            yield costumer_1.Costumer.findByIdAndDelete(costumerId, (err, costumerDB) => {
                if (err) {
                    throw err;
                }
                if (!costumerDB) {
                    res.json({
                        ok: false,
                        message: 'this costumer dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'delete costumer success'
                    });
                }
            });
        });
    }
}
exports.CostumerController = CostumerController;
