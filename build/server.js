"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _apolloServer = require("apollo-server");

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _models = _interopRequireDefault(require("./models"));

var _loaders = _interopRequireDefault(require("./loaders"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dataloader = _interopRequireDefault(require("dataloader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMe = async req => {
  const token = req.cookies.token;

  if (token) {
    try {
      return await _jsonwebtoken.default.verify(token, process.env.SECRET);
    } catch (e) {
      throw new _apolloServer.AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new _apolloServerExpress.ApolloServer({
  introspection: true,
  typeDefs: _schema.default,
  resolvers: _resolvers.default,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '');
    return { ...error,
      message
    };
  },
  context: async ({
    req,
    res,
    connection
  }) => {
    if (connection) {
      return {
        models: _models.default,
        loaders: {
          user: new _dataloader.default(keys => _loaders.default.user.batchUsers(keys, _models.default))
        }
      };
    }

    if (req) {
      const me = await getMe(req);
      return {
        models: _models.default,
        me,
        res,
        secret: process.env.SECRET,
        loaders: {
          user: new _dataloader.default(keys => _loaders.default.user.batchUsers(keys, _models.default))
        }
      };
    }
  }
});
exports.server = server;