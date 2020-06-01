"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    reference: {
        type: String,
        required: [true, 'the reference is necessary']
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
    },
    state: {
        type: String,
        required: [true, 'the department is necessary']
    },
    costumer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Costumer',
        required: [true, 'the costumer is necessary']
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'the service is necessary']
    },
    technical: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Technical',
        required: [true, 'the technical is necessary']
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
requestSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Requests = mongoose_1.model('Requests', requestSchema);
