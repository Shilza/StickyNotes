"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _user = _interopRequireDefault(require("./user"));

var _column = _interopRequireDefault(require("./column"));

var _board = _interopRequireDefault(require("./board"));

var _record = _interopRequireDefault(require("./record"));

var _mark = _interopRequireDefault(require("./mark"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const linkSchema = _apolloServerExpress.gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;
var _default = [linkSchema, _user.default, _board.default, _column.default, _record.default, _mark.default];
exports.default = _default;