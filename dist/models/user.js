"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'the name is necessary']
    },
    lastName: {
        type: String,
        required: [true, 'the lastName is necessary']
    },
    document: {
        type: Number,
        unique: true,
        required: [true, 'the document is necessary']
    },
    role: {
        type: String,
        required: [true, 'the role is necessary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'the email is necessary']
    },
    password: {
        type: String,
        required: [true, 'the password is necessary']
    },
    image: [{
            type: String,
            default: 'iron.png'
        }]
});
userSchema.method('comparePassword', function (password = '') {
    if (bcryptjs_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.User = mongoose_1.model('User', userSchema);
