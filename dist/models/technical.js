"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const technicalSchema = new mongoose_1.Schema({
    nameTechnical: {
        type: String,
        required: [true, 'the name Technical is necessary']
    },
    lastNameTechnical: {
        type: String,
        required: [true, 'the last Name Technical is necessary']
    },
    document: {
        type: Number,
        required: [true, 'the document is necessary']
    },
    city: {
        type: String,
        required: [true, 'the city is necessary']
    },
    department: {
        type: String,
        required: [true, 'the department is necessary']
    },
    email: {
        type: String,
        required: [true, 'the email is necessary']
    },
    phone: {
        type: Number,
        required: [true, 'the phone is necessary']
    },
    specialty: {
        type: String,
        required: [true, 'the specialty is necessary']
    },
    numberBill: {
        type: Number,
        required: [true, 'the numberBill is necessary']
    },
    bank: {
        type: String,
        required: [true, 'the bank is necessary']
    }
});
exports.Technical = mongoose_1.model('Technical', technicalSchema);
