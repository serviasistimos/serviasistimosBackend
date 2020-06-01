"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const insurance_1 = require("../controllers/insurance");
const InsuranceRoutes = express_1.Router();
const insuranceController = new insurance_1.InsuranceController();
InsuranceRoutes.post('/createInsurance', (req, res) => { insurance_1.InsuranceController.createInsurance(req, res); });
exports.default = InsuranceRoutes;
