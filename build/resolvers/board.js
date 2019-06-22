"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServer = require("apollo-server");

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Query: {
    board: async (parent, {
      title
    }, {
      models,
      me
    }) => {
      return await models.Board.findOne({
        ownerId: me.id,
        title
      });
    },
    boards: async (parent, args, {
      models,
      me
    }) => {
      return await models.Board.find({
        ownerId: me.id
      });
    }
  },
  Mutation: {
    createBoard: async (parent, {
      title,
      color
    }, {
      me,
      models
    }) => {
      if (title.length === 0 || title.length > 20) throw new _apolloServer.ValidationError('Title is invalid');
      if (color.length !== 7) throw new _apolloServer.ValidationError('Color is invalid');
      const board = await models.Board.findOne({
        ownerId: me.id,
        title
      });
      if (!Object.is(board, null)) throw new _apolloServer.ValidationError(`Board with title ${title} already exists`);
      return await models.Board.create({
        title: _validator.default.escape(_validator.default.trim(title)),
        color: _validator.default.escape(_validator.default.trim(color)),
        ownerId: me.id
      });
    },
    removeBoard: async (parent, {
      boardId
    }, {
      models,
      me
    }) => {
      const board = await models.Board.findOne({
        _id: boardId,
        ownerId: me.id
      });
      if (Object.is(board, null)) throw new _apolloServer.ValidationError('Board not found');
      await models.Board.remove({
        "_id": boardId
      });
      return true;
    },
    renameBoard: async (parent, {
      boardId,
      title
    }, {
      models,
      me
    }) => {
      const board = await models.Board.findOne({
        _id: boardId,
        ownerId: me.id
      });
      if (Object.is(board, null)) throw new _apolloServer.ValidationError('Board not found');
      if (title.length === 0 || title.length > 20) throw new _apolloServer.ValidationError('Title is invalid');
      const existedBoard = await models.Board.findOne({
        ownerId: me.id,
        title
      });
      if (!Object.is(existedBoard, null)) throw new _apolloServer.ValidationError(`Board with title ${title} already exists`);
      await models.Board.findByIdAndUpdate(boardId, {
        title: _validator.default.escape(_validator.default.trim(title))
      });
      return true;
    },
    changeBoardColor: async (parent, {
      boardId,
      color
    }, {
      models,
      me
    }) => {
      const board = await models.Board.findOne({
        _id: boardId,
        ownerId: me.id
      });
      if (Object.is(board, null)) throw new _apolloServer.ValidationError('Board not found');
      if (color.length !== 7) throw new _apolloServer.ValidationError('Color is invalid');
      await models.Board.findByIdAndUpdate(boardId, {
        color: _validator.default.escape(_validator.default.trim(color))
      });
      return true;
    }
  }
};
exports.default = _default;