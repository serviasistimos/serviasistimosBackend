"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_1 = require("../controllers/service");
const authentication_1 = require("../middlewares/authentication");
const ServiceRoutes = express_1.Router();
const serviceController = new service_1.ServiceController();
ServiceRoutes.post('/createService', [authentication_1.verifyToken], (req, res) => { serviceController.createService(req, res); });
exports.default = ServiceRoutes;
