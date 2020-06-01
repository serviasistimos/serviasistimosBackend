"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    saveImageTemp(file, userId) {
        return new Promise((resolve, reject) => {
            //create folder
            const path = this.createFolderUser(userId);
            //createOriginal name file
            const nameFile = this.createOriginalName(file.name);
            //move file sense temp folder to own folder
            file.mv(`${path}/${nameFile}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    createOriginalName(originalName) {
        const nameArr = originalName.split('.');
        const ext = nameArr[nameArr.length - 1];
        const idUnic = uniqid_1.default();
        return `${idUnic}.${ext}`;
    }
    createFolderUser(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads', userId);
        const pathUserTemp = pathUser + '/temp';
        const exist = fs_1.default.existsSync(pathUser);
        if (!exist) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
}
exports.default = FileSystem;
