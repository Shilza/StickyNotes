import jwt from 'jsonwebtoken';
import {combineResolvers} from 'graphql-resolvers';
import {AuthenticationError, UserInputError} from 'apollo-server';
import {isAdmin, isAuthenticated} from './authorization';

const createToken = async (user, secret, expiresIn) => {
    const {id, email, username, role} = user;
    return await jwt.sign({id, email, username, role}, secret, {
        expiresIn,
    });
};

export default {
    Query: {
        users: async (parent, args, {models}) => {
            return await models.User.find();
        },
        user: async (parent, {id}, {models}) => {
            return await models.User.findById(id);
        },
        me: async (parent, args, {models, me}) => {
            if (!me)
                return null;

            return await models.User.findById(me.id);
        },
    },

    Mutation: {
        signUp: async (
            parent,
            {username, email, password},
            {models, secret, res},
        ) => {
            const user = await models.User.create({
                username,
                password,
            });

            const options = {
                expires: new Date(Date.now() + 86400000),
                httpOnly: true,
                path: '/'
            };
            const token = await createToken(user, secret, '24h');
            res.cookie('token', token, options);

            return user;
        },

        signIn: async (
            parent,
            {login, password},
            {models, secret, res}
        ) => {
            const user = await models.User.findByLogin(login);

            if (!user)
                throw new UserInputError(
                    'No user found with this login credentials.',
                );

            const isValid = await user.validatePassword(password);

            if (!isValid)
                throw new AuthenticationError('Invalid password.');

            const options = {
                expires: new Date(Date.now() + 86400000),
                httpOnly: true,
                path: '/'
            };
            const token = await createToken(user, secret, '24h');
            res.cookie('token', token, options);

            return user;
        },

        logout: (
            parent,
            args,
            {res}
        ) => {
            res.clearCookie('token');
            return true;
        },

        updateUser: combineResolvers(
            isAuthenticated,
            async (parent, {username}, {models, me}) => {
                return await models.User.findByIdAndUpdate(
                    me.id,
                    {username},
                    {new: true},
                );
            },
        ),

        deleteUser: combineResolvers(
            isAdmin,
            async (parent, {id}, {models}) => {
                const user = await models.User.findById(id);

                if (user) {
                    await user.remove();
                    return true;
                } else
                    return false;
            },
        ),
    },
};


// Remove collection
// var mongoose = require('mongoose');
// var db = mongoose.connection;
// var Schema = mongoose.Schema;
// db.on('error', console.error);
// db.once('open', function () {
//     console.log("db connect");
//     db.dropCollection("boards", function (err, result) {
//         if (err) {
//             console.log("error delete collection");
//         } else {
//             console.log("delete collection success");
//         }
//     });
// });