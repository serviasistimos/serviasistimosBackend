"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const authentication_1 = require("../middlewares/authentication");
const userRoutes = express_1.Router();
const userController = new user_1.UserController();
userRoutes.post('/create', (req, res) => { userController.createUser(req, res); });
userRoutes.post('/login', (req, res) => { userController.login(req, res); });
userRoutes.put('/update', authentication_1.verifyToken, (req, res) => { userController.updateUser(req, res); });
userRoutes.post('/uploadImage', authentication_1.verifyToken, (req, res) => { userController.uploadImage(req, res); });
userRoutes.get('/image/:userId/:img', (req, res) => { userController.showImage(req, res); });
userRoutes.get('/getUsers', (req, res) => { userController.getUsers(req, res); });
userRoutes.get('/getUser/:id', authentication_1.verifyToken, (req, res) => { userController.getUserById(req, res); });
userRoutes.delete('/deleteUser/:id', authentication_1.verifyToken, (req, res) => { userController.deleteUser(req, res); });
exports.default = userRoutes;
