import 'dotenv/config';
import cookieParser from 'cookie-parser';
import path from 'path';
import http from 'http';
import express from 'express';
import {connectDb} from './models';
import {server} from './server';

const app = express();

app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../frontend/build/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

//app.use(morgan('dev'));

server.applyMiddleware({
    app,
    path: '/graphql'
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;

connectDb().then(async () => {
    httpServer.listen({port});
});
