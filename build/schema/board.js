"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = _apolloServerExpress.gql`
    extend type Query {
        boards: [Board!]
        board(title: String): Board!
    }

    extend type Mutation {
        createBoard(title: String!, color: String!): Board!
        removeBoard(boardId: ID!): Boolean
        renameBoard(boardId: ID!, title: String): Boolean
        changeBoardColor(boardId: ID!, color: String): Boolean
    }

    type Board {
        id: ID!
        color: String!
        title: String!
    }
`;

exports.default = _default;