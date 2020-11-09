import express from 'express'
import morgan from 'morgan';
import path from 'path';

const app = express();

import IndesRouter from './routes/index'

// settings
app.set('port',process.env.PORT || 4000)


// middleawres
app.use(morgan('dev'));
app.use(express.json())


// routes
app.use('/api', IndesRouter);


// this folder for this appliactions will be used  to store public files
app.use('/uploads', express.static(path.resolve('uploads')));


export default app;