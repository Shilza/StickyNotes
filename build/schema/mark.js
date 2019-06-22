"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = _apolloServerExpress.gql`
    extend type Query {
        marks: [Mark!]
    }

    extend type Mutation {
        createMark(color: String!, recordId: ID!): Mark!
        removeMark(markId: ID!): Boolean
    }

    type Mark {
        id: ID!,
        color: String!,
        recordId: ID!
    }
`;

exports.default = _default;