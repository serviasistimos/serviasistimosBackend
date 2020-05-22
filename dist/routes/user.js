"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const authentication_1 = require("../middlewares/authentication");
const user_2 = require("../models/user");
const token_1 = __importDefault(require("../classes/token"));
const userRoutes = express_1.Router();
const userController = new user_1.UserController();
userRoutes.post('/create', (req, res) => { userController.createUser(req, res); });
userRoutes.post('/login', (req, res) => { userController.login(req, res); });
userRoutes.post('/update', authentication_1.verifyToken, (req, res) => {
    const body = req.body;
    const user = {
        nickname: body.nickname || body.nickname,
        password: body.password || body.password,
        image: body.image || body.image
    };
    user_2.User.findByIdAndUpdate(req.user.id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            res.json({
                ok: false,
                message: 'there isnt any user with that ID'
            });
        }
        const tokenUser = token_1.default.getJwtToken({
            id: userDB.id,
            name: userDB.name,
            lastName: userDB.lastName,
            document: userDB.document,
            email: userDB.email,
            nickname: userDB.nickname,
            image: userDB.image
        });
        res.json({
            ok: true,
            token: tokenUser,
            user: userDB
        });
    });
});
exports.default = userRoutes;
