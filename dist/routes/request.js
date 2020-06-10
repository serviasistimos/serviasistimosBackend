"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_1 = require("../controllers/request");
const authentication_1 = require("../middlewares/authentication");
const requestRoutes = express_1.Router();
const requestController = new request_1.RequestController();
requestRoutes.post('/createRequest', [authentication_1.verifyToken], (req, res) => { requestController.createRequest(req, res); });
requestRoutes.get('/getRequests', [authentication_1.verifyToken], (req, res) => { requestController.getRequest(req, res); });
exports.default = requestRoutes;
