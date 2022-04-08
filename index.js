import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import licenceRoutes from './routes/licence.js'


console.log('starting...');
const app = express();

app.use(bodyParser.json({limit:"20mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"20mb", extended:true}))
app.use(cors());

app.use('/licence', licenceRoutes);

const DB_CONNECTION_URL = 'mongodb://127.0.0.1:27017/licence';
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_CONNECTION_URL, {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(() => app.listen(PORT, () =>
    console.log(`Connection is established and running on port ${PORT}`)    
)).catch((err) => console.log(err.message));

console.log('started...');
