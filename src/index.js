import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import express from 'express';
import {connectDb} from './models';
import {server} from './server';

const app = express();

app.use(cors());

app.use(cookieParser());

//app.use(morgan('dev'));

server.applyMiddleware({app, cors: {
        origin: '*',
        credentials: true
    }, path: '/graphql'});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;

connectDb().then(async () => {
    httpServer.listen({port});
});
