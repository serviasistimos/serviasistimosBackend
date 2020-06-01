"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const technical_1 = require("../controllers/technical");
const authentication_1 = require("../middlewares/authentication");
const TechnicalRoutes = express_1.Router();
const technicalController = new technical_1.TechnicalController();
TechnicalRoutes.post('/createTechnical', authentication_1.verifyToken, (req, res) => { technicalController.createTechnical(req, res); });
exports.default = TechnicalRoutes;
