"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestCommentary = void 0;
const mongoose_1 = require("mongoose");
const requestCommentarySchema = new mongoose_1.Schema({
    commentary: {
        type: String,
        required: [false, 'the commentary is necessary']
    },
    created: {
        type: Date
    },
    request: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Requests',
        required: [true, 'the User is necessary']
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'the User is necessary']
    }
});
requestCommentarySchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.RequestCommentary = mongoose_1.model('RequestCommentary', requestCommentarySchema);
