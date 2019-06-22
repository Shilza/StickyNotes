"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recordSchema = new _mongoose.default.Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 400
  },
  index: {
    type: Number,
    required: true
  },
  columnId: {
    type: String,
    ref: 'Column'
  },
  ownerId: {
    type: String,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
});

recordSchema.statics.findByColumnId = async function (columnId) {
  const records = await this.find({
    columnId
  }).sort('index');
  const marksPromises = records.map(record => _index.default.Mark.findByRecordId(record.id));
  const marksResult = await Promise.all(marksPromises);
  return records.map(record => {
    record.marks = [];
    marksResult.forEach(marks => {
      if (marks[0] && marks[0].recordId === record.id) record.marks = marks;
    });
    return record;
  });
};

recordSchema.statics.findByIndex = async function (minIndex, maxIndex, columnId, ownerId) {
  return await this.find({
    index: {
      $gt: minIndex,
      $lt: maxIndex
    },
    columnId,
    ownerId
  }).sort('index');
};

const Record = _mongoose.default.model('Record', recordSchema);

var _default = Record;
exports.default = _default;