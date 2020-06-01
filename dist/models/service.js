"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    nameService: {
        type: String,
        required: [true, 'the name Service is necessary']
    },
    valueMaterials: {
        type: Number,
        required: [true, 'the value Materials is necessary']
    },
    valueAsistimos: {
        type: Number,
        required: [true, 'the value Asistimos is necessary']
    },
    valueCostumer: {
        type: Number,
        required: [true, 'the value Costumer is necessary']
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
