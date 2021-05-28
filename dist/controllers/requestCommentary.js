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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestCommentaryController = void 0;
const requestCommentary_1 = require("../models/requestCommentary");
const user_1 = require("../models/user");
class RequestCommentaryController {
    constructor() { }
    getRequestCommentaries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            requestCommentary_1.RequestCommentary.find().then(requestCommentary => {
                res.json({
                    ok: true,
                    message: 'get RequestCommentary success',
                    requestCommentary: requestCommentary
                });
                if (!requestCommentary) {
                    res.json({
                        ok: false,
                        message: 'there arent requestCommentary'
                    });
                }
            }).catch(err => {
                res.json({
                    ok: false,
                    message: 'get requestCommentary failed'
                });
            });
        });
    }
    getRequestCommentaryById(req, res) {
        var commentaryId = req.params.id;
        requestCommentary_1.RequestCommentary.findById(commentaryId, function (err, commentaryBD) {
            if (err) {
                throw err;
            }
            if (!commentaryBD) {
                res.json({
                    ok: true,
                    status: 401,
                    message: 'this comentary dont exist'
                });
            }
            else {
                user_1.User.findById(commentaryBD.user, function (err, userBD) {
                    res.json({
                        ok: true,
                        status: 200,
                        commentary: commentaryBD,
                        user: userBD
                    });
                });
            }
        });
    }
    createRequestCommentary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const user = req.user.id;
            const requestCommentary = {
                commentary: body.commentary,
                request: body.request,
                user: user
            };
            yield requestCommentary_1.RequestCommentary.create(requestCommentary).then((requestCommentaryDB) => __awaiter(this, void 0, void 0, function* () {
                yield requestCommentaryDB.populate('user', '-password').execPopulate();
                res.json({
                    ok: true,
                    requestCommentary: requestCommentaryDB
                });
            })).catch(err => {
                res.json({
                    ok: false,
                    err
                });
            });
        });
    }
}
exports.RequestCommentaryController = RequestCommentaryController;
