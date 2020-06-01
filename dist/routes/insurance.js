"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const insurance_1 = require("../controllers/insurance");
const authentication_1 = require("../middlewares/authentication");
const InsuranceRoutes = express_1.Router();
const insuranceController = new insurance_1.InsuranceController();
InsuranceRoutes.post('/createInsurance', authentication_1.verifyToken, (req, res) => { insuranceController.createInsurance(req, res); });
exports.default = InsuranceRoutes;
