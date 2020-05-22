import Server from './classes/server';
import userRoutes from './routes/user';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const server = new Server();

//bodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

//routes
server.app.use('/user', userRoutes);

//connection BD
mongoose.connect('mongodb://localhost:27017/serviAsistimos',
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