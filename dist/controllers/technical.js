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
const technical_1 = require("../models/technical");
class TechnicalController {
    constructor() { }
    createTechnical(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const technical = {
                nameTechnical: body.nameTechnical,
                lastNameTechnical: body.lastNameTechnical,
                document: body.document,
                email: body.email,
                phone: body.phone,
                specialty: body.specialty,
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
}
exports.TechnicalController = TechnicalController;
