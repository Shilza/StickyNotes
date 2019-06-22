"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("./user"));

var _board = _interopRequireDefault(require("./board"));

var _column = _interopRequireDefault(require("./column"));

var _record = _interopRequireDefault(require("./record"));

var _mark = _interopRequireDefault(require("./mark"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectDb = () => {
  if (process.env.TEST_DATABASE_URL) {
    return _mongoose.default.connect(process.env.TEST_DATABASE_URL, {
      useNewUrlParser: true
    });
  }

  if (process.env.DATABASE_URL) {
    return _mongoose.default.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true
    });
  }
};

exports.connectDb = connectDb;
const models = {
  User: _user.default,
  Board: _board.default,
  Column: _column.default,
  Record: _record.default,
  Mark: _mark.default
};
var _default = models;
exports.default = _default;