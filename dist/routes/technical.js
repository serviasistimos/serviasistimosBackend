"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const technical_1 = require("../controllers/technical");
const authentication_1 = require("../middlewares/authentication");
const technicalRoutes = express_1.Router();
const technicalController = new technical_1.TechnicalController();
technicalRoutes.post('/createTechnical', [authentication_1.verifyToken], (req, res) => { technicalController.createTechnical(req, res); });
technicalRoutes.put('/updateTechnical/:id', [authentication_1.verifyToken], (req, res) => { technicalController.updateTechnical(req, res); });
technicalRoutes.delete('/deleteTechnical/:id', [authentication_1.verifyToken], (req, res) => { technicalController.deleteTechnical(req, res); });
technicalRoutes.get('/technicals', [authentication_1.verifyToken], (req, res) => { technicalController.getTechnicals(req, res); });
technicalRoutes.get('/technical/:id', [authentication_1.verifyToken], (req, res) => { technicalController.getTechnicalById(req, res); });
exports.default = technicalRoutes;
// no olvidar colocar de nuevo verifyToken a las rutas
