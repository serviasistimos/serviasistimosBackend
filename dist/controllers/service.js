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
const service_1 = require("../models/service");
class ServiceController {
    constructor() { }
    createService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const user = req.user.id;
            const technical = {
                valueMaterials: body.valueMaterials,
                valueAsistimos: body.valueAsistimos,
                valueCostumer: body.valueCostumer,
                commentary: body.commentary,
                nameService: body.nameService,
                user: user
            };
            yield service_1.Service.create(technical).then((serviceDB) => __awaiter(this, void 0, void 0, function* () {
                yield serviceDB.populate('user', '-password').execPopulate();
                res.json({
                    ok: true,
                    service: serviceDB
                });
            })).catch(err => {
                res.json({
                    ok: false,
                    err
                });
            });
        });
    }
}
exports.ServiceController = ServiceController;
