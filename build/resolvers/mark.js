"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _apolloServer = require("apollo-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Query: {
    marks: async (parent, args, {
      models
    }) => {
      return await models.Mark.find();
    }
  },
  Mutation: {
    createMark: async (parent, {
      color,
      recordId
    }, {
      models,
      me
    }) => {
      if (color.length !== 7) throw new _apolloServer.ValidationError('Color must have 7 characters');
      return await models.Mark.create({
        color: _validator.default.escape(_validator.default.trim(color)),
        recordId,
        ownerId: me.id
      });
    },
    removeMark: async (parent, {
      markId
    }, {
      models,
      me
    }) => {
      const mark = await models.Mark.findOne({
        _id: markId,
        ownerId: me.id
      });
      if (Object.is(mark, null)) throw new _apolloServer.ForbiddenError('Only owner can remove mark');
      await models.Mark.remove({
        "_id": markId
      });
      return true;
    }
  }
};
exports.default = _default;