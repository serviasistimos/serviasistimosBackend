"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_1 = require("../controllers/service");
const authentication_1 = require("../middlewares/authentication");
const serviceRoutes = express_1.Router();
const serviceController = new service_1.ServiceController();
serviceRoutes.post('/createService', [authentication_1.verifyToken], (req, res) => { serviceController.createService(req, res); });
exports.default = serviceRoutes;
