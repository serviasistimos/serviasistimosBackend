"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Insurance = void 0;
const mongoose_1 = require("mongoose");
const insuranceSchema = new mongoose_1.Schema({
    nameInsurance: {
        type: String,
        required: [true, 'the name Insurance is necessary']
    }
});
exports.Insurance = mongoose_1.model('Insurance', insuranceSchema);
