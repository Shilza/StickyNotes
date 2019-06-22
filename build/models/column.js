"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const columnSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20
  },
  index: {
    type: Number,
    required: true
  },
  boardId: {
    type: String,
    ref: 'Column'
  },
  ownerId: {
    type: String,
    ref: 'User'
  }
});

columnSchema.statics.findByOwnerId = async function (ownerId, boardId) {
  return await this.find({
    ownerId,
    boardId
  }).sort('index');
};

columnSchema.statics.findByIndex = async function (minIndex, maxIndex, ownerId, boardId) {
  return await this.find({
    index: {
      $gt: minIndex,
      $lt: maxIndex
    },
    ownerId,
    boardId
  }).sort('index');
};

const Column = _mongoose.default.model('Column', columnSchema);

var _default = Column;
exports.default = _default;