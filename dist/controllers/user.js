"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
class UserController {
    constructor() { }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const user = {
                name: body.name,
                lastName: body.lastName,
                document: body.document,
                role: body.role,
                email: body.email,
                nickname: body.nickname,
                password: bcrypt_1.default.hashSync(body.password, 10),
                image: body.image
            };
            yield user_1.User.create(user).then(userDB => {
                const tokenUser = token_1.default.getJwtToken({
                    id: userDB.id,
                    name: userDB.name,
                    lastName: userDB.lastName,
                    document: userDB.document,
                    email: userDB.email,
                    image: userDB.image
                });
                res.json({
                    ok: true,
                    token: tokenUser,
                    user: userDB
                });
            }).catch(err => {
                res.json({
                    ok: false,
                    err
                });
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield user_1.User.findOne({ email: body.email }, (err, userDB) => {
                if (err)
                    throw err;
                if (!userDB) {
                    return res.json({
                        ok: false,
                        message: 'user/password invalid'
                    });
                }
                if (userDB.comparePassword(body.password)) {
                    const tokenUser = token_1.default.getJwtToken({
                        id: userDB.id,
                        name: userDB.name,
                        lastName: userDB.lastName,
                        document: userDB.document,
                        email: userDB.email,
                        image: userDB.image
                    });
                    res.json({
                        ok: true,
                        token: tokenUser
                    });
                }
                else {
                    return res.json({
                        ok: false,
                        message: 'user/password invalid ***'
                    });
                }
            });
        });
    }
    updateUser(req, res) {
        const body = req.body;
        const user = {
            nickname: body.nickname || req.user.nickname,
            password: body.password || req.user.password,
            image: body.image || req.user.image
        };
        user_1.User.findByIdAndUpdate(req.user.id, user, { new: true }, (err, userDB) => {
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
    }
}
exports.UserController = UserController;
