"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = _apolloServerExpress.gql`
    extend type Query {
        users: [User!]
        user(id: ID!): User
        me: User
    }

    extend type Mutation {
        signUp(
            username: String!
            password: String!
        ): User!

        signIn(login: String!, password: String!): User!
        logout: Boolean!
        updateUser(username: String!): User!
        deleteUser(id: ID!): Boolean!
    }

    type Token {
        token: String!
    }

    type User {
        username: String!
    }
`;

exports.default = _default;