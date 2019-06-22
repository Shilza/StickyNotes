"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const markSchema = new _mongoose.default.Schema({
  color: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 7
  },
  recordId: {
    type: String,
    ref: 'Record'
  },
  ownerId: {
    type: String,
    ref: 'User'
  }
});

markSchema.statics.findByRecordId = async function (recordId) {
  return await this.find({
    recordId
  });
};

const Mark = _mongoose.default.model('mark', markSchema);

var _default = Mark;
exports.default = _default;