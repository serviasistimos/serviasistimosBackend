"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    nameService: {
        type: String,
        required: [true, 'the name Service is necessary']
    },
    commentary: {
        type: String,
        required: [false, 'the commentary is necessary']
    },
    created: {
        type: Date
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'the User is necessary']
    }
});
serviceSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Service = mongoose_1.model('Service', serviceSchema);
