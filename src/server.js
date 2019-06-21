import {ApolloServer} from "apollo-server-express";
import {AuthenticationError} from 'apollo-server';
import schema from "./schema";
import resolvers from "./resolvers";
import models from "./models";
import loaders from "./loaders";
import jwt from "jsonwebtoken";
import DataLoader from "dataloader";

const getMe = async req => {
    const token = req.cookies.token;

    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (e) {
            throw new AuthenticationError(
                'Your session expired. Sign in again.',
            );
        }
    }
};

export const server = new ApolloServer({
    cors: {
        origin: '*',
        credentials: true
    },
    introspection: true,
    typeDefs: schema,
    resolvers,
    formatError: error => {
        // remove the internal sequelize error message
        // leave only the important validation error
        const message = error.message
            .replace('SequelizeValidationError: ', '')
            .replace('Validation error: ', '');

        return {
            ...error,
            message,
        };
    },
    context: async ({req, res, connection}) => {
        if (connection) {
            return {
                models,
                loaders: {
                    user: new DataLoader(keys =>
                        loaders.user.batchUsers(keys, models),
                    ),
                },
            };
        }

        if (req) {
            const me = await getMe(req);

            return {
                models,
                me,
                res,
                secret: process.env.SECRET,
                loaders: {
                    user: new DataLoader(keys =>
                        loaders.user.batchUsers(keys, models),
                    ),
                },
            };
        }
    },
});