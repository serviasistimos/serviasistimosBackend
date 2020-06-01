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
class RequestController {
    constructor() { }
    createRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const user = req.user.id;
            const request = {
                reference: body.reference,
                phone: body.phone,
                address: body.address,
                city: body.city,
                department: body.department,
                state: body.state,
                costumer: body.costumer,
                service: body.service,
                technical: body.technical,
                user: user
            };
            yield request_1.Requests.create(request).then((requestDB) => __awaiter(this, void 0, void 0, function* () {
                yield requestDB.populate('user', '-password').execPopulate();
                res.json({
                    ok: true,
                    request: requestDB
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
}
exports.RequestController = RequestController;
