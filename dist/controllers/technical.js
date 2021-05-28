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
exports.TechnicalController = void 0;
const technical_1 = require("../models/technical");
class TechnicalController {
    constructor() { }
    getTechnicals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            technical_1.Technical.find().then(technical => {
                res.json({
                    ok: true,
                    message: 'get technical success',
                    technical: technical
                });
                if (!technical) {
                    res.json({
                        ok: false,
                        message: 'there arent service'
                    });
                }
            }).catch(err => {
                res.json({
                    ok: false,
                    message: 'get service failed'
                });
            });
        });
    }
    getTechnicalById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var technicalId = req.params.id;
            technical_1.Technical.findById(technicalId, function (err, technicalBD) {
                if (err) {
                    throw err;
                }
                if (!technicalBD) {
                    res.json({
                        ok: false,
                        status: 401,
                        message: 'technical dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200,
                        message: 'get technical success',
                        technical: technicalBD
                    });
                }
            });
        });
    }
    createTechnical(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const technical = {
                nameTechnical: body.nameTechnical,
                lastNameTechnical: body.lastNameTechnical,
                document: body.document,
                email: body.email,
                phone: body.phone,
                city: body.city,
                department: body.department,
                specialty: body.specialty,
                numberBill: body.numberBill,
                bank: body.bank
            };
            yield technical_1.Technical.create(technical).then(technicalDB => {
                res.json({
                    ok: true,
                    technical: technicalDB
                });
            }).catch(err => {
                res.json({
                    ok: false,
                    err
                });
            });
        });
    }
    updateTechnical(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var technicalId = req.params.id;
            const user = req.user.id;
            var body = req.body;
            const technicalUpdate = {
                nameTechnical: body.nameTechnical,
                lastNameTechnical: body.lastNameTechnical,
                document: body.document,
                email: body.email,
                phone: body.phone,
                city: body.city,
                department: body.department,
                specialty: body.specialty,
                numberBill: body.numberBill,
                bank: body.bank,
                user: user
            };
            technical_1.Technical.findByIdAndUpdate(technicalId, technicalUpdate, { new: true }, (err, technicalDB) => {
                if (err)
                    throw err;
                if (!technicalDB) {
                    res.json({
                        ok: false,
                        message: 'this technical dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'upload technical success',
                        technical: technicalDB
                    });
                }
            });
        });
    }
    deleteTechnical(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var technicalId = req.params.id;
            yield technical_1.Technical.findByIdAndDelete(technicalId, (err, technicalDB) => {
                if (err) {
                    throw err;
                }
                if (!technicalDB) {
                    res.json({
                        ok: false,
                        message: 'this technical dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'delete technical success'
                    });
                }
            });
        });
    }
}
exports.TechnicalController = TechnicalController;
