"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const boardSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20
  },
  color: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 7
  },
  ownerId: {
    type: String,
    ref: 'User'
  }
});

const Board = _mongoose.default.model('Board', boardSchema);

var _default = Board;
exports.default = _default;