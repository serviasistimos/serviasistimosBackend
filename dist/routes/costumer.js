"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const costumer_1 = require("../controllers/costumer");
const authentication_1 = require("../middlewares/authentication");
const CostumerRoutes = express_1.Router();
const costumerController = new costumer_1.CostumerController();
CostumerRoutes.post('/createCostumer', authentication_1.verifyToken, (req, res) => { costumerController.createCostumer(req, res); });
exports.default = CostumerRoutes;
