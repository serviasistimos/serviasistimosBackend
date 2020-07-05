"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const technical_1 = require("../controllers/technical");
const technicalRoutes = express_1.Router();
const technicalController = new technical_1.TechnicalController();
technicalRoutes.post('/createTechnical', (req, res) => { technicalController.createTechnical(req, res); });
technicalRoutes.put('/updateTechnical/:id', (req, res) => { technicalController.updateTechnical(req, res); });
technicalRoutes.delete('/deleteTechnical/:id', (req, res) => { technicalController.deleteTechnical(req, res); });
technicalRoutes.get('/technicals', (req, res) => { technicalController.getTechnicals(req, res); });
technicalRoutes.get('/technical/:id', (req, res) => { technicalController.getTechnicalById(req, res); });
exports.default = technicalRoutes;
// no olvidar colocar de nuevo verifyToken a las rutas
