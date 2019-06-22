"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = _apolloServerExpress.gql`
    extend type Query {
        columns(title: String!): [Column!]
    }

    extend type Mutation {
        createColumn(title: String!, boardTitle: String!) : Column!
        removeColumn(columnId: ID!): Boolean
        renameColumn(columnId: ID!, title: String!): Boolean
        reorderColumns(oldIndex: Int!, newIndex: Int!): Boolean
    }

    type Column {
        title: String!
        records: [Record!]
        index: Int!
        id: ID!
    }
`;

exports.default = _default;