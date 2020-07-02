import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import insuranceRoutes from './routes/insurance';
import technicalRoutes from './routes/technical';
import costumerRoutes from './routes/costumer';
import serviceRoutes from './routes/service';
import requestRoutes from './routes/request';
import userRoutes from './routes/user';
import insuranceCostumerRoutes from './routes/insuranceCostumer';
import requestCommentaryRoutes from './routes/requestCommentary';


const server = new Server();

//bodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

//fileUpload
server.app.use( fileUpload() );

//routes
server.app.use('/user', userRoutes);
server.app.use('/insurance', insuranceRoutes);
server.app.use('/technical', technicalRoutes);
server.app.use('/costumer', costumerRoutes);
server.app.use('/service', serviceRoutes);
server.app.use('/request', requestRoutes);
server.app.use('/insuranceCostumer', insuranceCostumerRoutes);
server.app.use('/requestCommentary', requestCommentaryRoutes);

//connection BD
// mongodb://localhost:27017/serviAsistimos
//mongodb+srv://dbAsistimos:dbAsistimos@cluster0-mvxvy.mongodb.net/dbAsistimos?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://dbAsistimos:dbAsistimos@cluster0-mvxvy.mongodb.net/dbAsistimos?retryWrites=true&w=majority',
                {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true
                }, ( err ) => {
                    
                    if( err ) throw err;
                    console.log('Database ONLINE');
                }
);

// express (Server)
server.start( () => {
    console.log('servidor corriendo en el puerto ' + server.port);
});