import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import http from 'http';
import express from 'express';
import {connectDb} from './models';
import {server} from './server';
import { bodyParserGraphQL } from 'body-parser-graphql'

const app = express();


app.use(cors());

app.use(cookieParser());

app.use('/graphql', bodyParserGraphQL());

//app.use(morgan('dev'));

server.applyMiddleware({app, path: '/graphql'});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;

connectDb().then(async () => {
    httpServer.listen({port});
});
