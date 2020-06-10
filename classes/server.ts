import express from 'express';

export default class Server {

    public app : express.Application;
    public port: Number = 3000 || process.env.PORT;

    constructor() {
        this.app = express();
    }

    start( callback: Function ) {
        this.app.listen( this.port, callback() );
    }
}