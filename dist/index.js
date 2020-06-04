"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const insurance_1 = __importDefault(require("./routes/insurance"));
const technical_1 = __importDefault(require("./routes/technical"));
const costumer_1 = __importDefault(require("./routes/costumer"));
const service_1 = __importDefault(require("./routes/service"));
const request_1 = __importDefault(require("./routes/request"));
const user_1 = __importDefault(require("./routes/user"));
const server = new server_1.default();
//bodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//fileUpload
server.app.use(express_fileupload_1.default());
//routes
server.app.use('/user', user_1.default);
server.app.use('/insurance', insurance_1.default);
server.app.use('/technical', technical_1.default);
server.app.use('/costumer', costumer_1.default);
server.app.use('/service', service_1.default);
server.app.use('/request', request_1.default);
// Configurar cabeceras y cors
server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//connection BD
// mongodb://localhost:27017/serviAsistimos
mongoose_1.default.connect('mongodb+srv://dbAsistimos:dbAsistimos@cluster0-mvxvy.mongodb.net/dbAsistimos?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err) => {
    if (err)
        throw err;
    console.log('Database ONLINE');
});
// express (Server)
server.start(() => {
    console.log('servidor corriendo en el puerto ' + server.port);
});
