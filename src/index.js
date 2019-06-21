import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import http from 'http';
import express from 'express';
import {connectDb} from './models';
import {server} from './server';
const bodyParser = require('body-parser');

const app = express();
app.use('/graphql', bodyParser.text());

app.use('/graphql', (req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', req.get('Access-Control-Request-Method'));
        res.set('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'));
        res.set('Access-Control-Allow-Credentials', true);

        return res.status(200).send();
    }
    if(req.method === 'POST' && typeof req.body === 'string')
        req.body = JSON.parse(req.body);

    next();
});

app.use(cors());

app.use(cookieParser());

//app.use(morgan('dev'));

server.applyMiddleware({app, path: '/graphql'});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;

connectDb().then(async () => {
    httpServer.listen({port});
});
