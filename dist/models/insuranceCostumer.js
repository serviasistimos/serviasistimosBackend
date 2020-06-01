"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const insuranceCostumerSchema = new mongoose_1.Schema({
    costumer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Costumer',
        required: [true, 'the costumer is necessary']
    },
    insurance: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Insurance',
        required: [true, 'the insurance is necessary']
    }
});
exports.InsuranceCostumer = mongoose_1.model('InsuranceCostumer', insuranceCostumerSchema);
