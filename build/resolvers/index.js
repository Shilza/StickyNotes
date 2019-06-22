"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlIsoDate = require("graphql-iso-date");

var _user = _interopRequireDefault(require("./user"));

var _column = _interopRequireDefault(require("./column"));

var _board = _interopRequireDefault(require("./board"));

var _record = _interopRequireDefault(require("./record"));

var _mark = _interopRequireDefault(require("./mark"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const customScalarResolver = {
  Date: _graphqlIsoDate.GraphQLDateTime
};
var _default = [customScalarResolver, _user.default, _board.default, _column.default, _record.default, _mark.default];
exports.default = _default;