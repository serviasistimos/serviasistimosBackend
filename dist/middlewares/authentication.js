"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("../classes/token"));
exports.verifyToken = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    token_1.default.checkToken(userToken)
        .then((decoded) => {
        console.log('decoded', decoded);
        req.user = decoded.usuario;
        next();
    }).catch(err => {
        res.json({
            ok: false,
            message: 'token invalid'
        });
    });
};
