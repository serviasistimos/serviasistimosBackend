"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const costumerSchema = new mongoose_1.Schema({
    nameCostumer: {
        type: String,
        required: [true, 'the name Costumer is necessary']
    },
    phone: {
        type: Number,
        required: [true, 'the phone is necessary']
    },
    address: {
        type: String,
        required: [true, 'the address is necessary']
    },
    city: {
        type: String,
        required: [true, 'the city is necessary']
    },
    department: {
        type: String,
        required: [true, 'the department is necessary']
    }
});
exports.Costumer = mongoose_1.model('Costumer', costumerSchema);
