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
    getServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            service_1.Service.find().then(services => {
                res.json({
                    ok: true,
                    message: 'get services success',
                    services: services
                });
                if (!services) {
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
    getServiceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var serviceId = req.params.id;
            service_1.Service.findById(serviceId, function (err, serviceBD) {
                if (err) {
                    throw err;
                }
                if (!serviceBD) {
                    res.json({
                        ok: false,
                        status: 401,
                        message: 'service dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200,
                        message: 'get service success',
                        service: serviceBD
                    });
                }
            });
        });
    }
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
    updateService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var serviceId = req.params.id;
            const user = req.user.id;
            var body = req.body;
            const serviceUpdate = {
                valueMaterials: body.valueMaterials,
                valueAsistimos: body.valueAsistimos,
                valueCostumer: body.valueCostumer,
                commentary: body.commentary,
                nameService: body.nameService,
                user: user
            };
            service_1.Service.findByIdAndUpdate(serviceId, serviceUpdate, { new: true }, (err, serviceDB) => {
                if (err)
                    throw err;
                if (!serviceDB) {
                    res.json({
                        ok: false,
                        message: 'this service dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'upload service success',
                        service: serviceDB
                    });
                }
            });
        });
    }
    deleteService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var serviceId = req.params.id;
            yield service_1.Service.findByIdAndDelete(serviceId, (err, serviceDB) => {
                if (err) {
                    throw err;
                }
                if (!serviceDB) {
                    res.json({
                        ok: false,
                        message: 'this service dont exist'
                    });
                }
                else {
                    res.json({
                        ok: true,
                        message: 'delete service success'
                    });
                }
            });
        });
    }
}
exports.ServiceController = ServiceController;
