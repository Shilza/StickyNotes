"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _graphqlResolvers = require("graphql-resolvers");

var _apolloServer = require("apollo-server");

var _authorization = require("./authorization");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createToken = async (user, secret, expiresIn) => {
  const {
    id,
    email,
    username,
    role
  } = user;
  return await _jsonwebtoken.default.sign({
    id,
    email,
    username,
    role
  }, secret, {
    expiresIn
  });
};

var _default = {
  Query: {
    users: async (parent, args, {
      models
    }) => {
      return await models.User.find();
    },
    user: async (parent, {
      id
    }, {
      models
    }) => {
      return await models.User.findById(id);
    },
    me: async (parent, args, {
      models,
      me
    }) => {
      if (!me) return null;
      return await models.User.findById(me.id);
    }
  },
  Mutation: {
    signUp: async (parent, {
      username,
      email,
      password
    }, {
      models,
      secret,
      res
    }) => {
      const user = await models.User.create({
        username,
        password
      });
      const options = {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        path: '/'
      };
      const token = await createToken(user, secret, '24h');
      res.cookie('token', token, options);
      return user;
    },
    signIn: async (parent, {
      login,
      password
    }, {
      models,
      secret,
      res
    }) => {
      const user = await models.User.findByLogin(login);
      if (!user) throw new _apolloServer.UserInputError('No user found with this login credentials.');
      const isValid = await user.validatePassword(password);
      if (!isValid) throw new _apolloServer.AuthenticationError('Invalid password.');
      const options = {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        path: '/'
      };
      const token = await createToken(user, secret, '24h');
      res.cookie('token', token, options);
      return user;
    },
    logout: (parent, args, {
      res
    }) => {
      res.clearCookie('token');
      return true;
    },
    updateUser: (0, _graphqlResolvers.combineResolvers)(_authorization.isAuthenticated, async (parent, {
      username
    }, {
      models,
      me
    }) => {
      return await models.User.findByIdAndUpdate(me.id, {
        username
      }, {
        new: true
      });
    }),
    deleteUser: (0, _graphqlResolvers.combineResolvers)(_authorization.isAdmin, async (parent, {
      id
    }, {
      models
    }) => {
      const user = await models.User.findById(id);

      if (user) {
        await user.remove();
        return true;
      } else return false;
    })
  }
}; // Remove collection
// var mongoose = require('mongoose');
// var db = mongoose.connection;
// var Schema = mongoose.Schema;
// db.on('error', console.error);
// db.once('open', function () {
//     console.log("db connect");
//     db.dropCollection("boards", function (err, result) {
//         if (err) {
//             console.log("error delete collection");
//         } else {
//             console.log("delete collection success");
//         }
//     });
// });

exports.default = _default;