"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 42
  }
});

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login
  });

  if (!user) {
    user = await this.findOne({
      username: login
    });
  }

  return user;
};

userSchema.pre('save', async function () {
  this.password = await this.generatePasswordHash();
});

userSchema.methods.generatePasswordHash = async function () {
  const saltRounds = 10;
  return await _bcrypt.default.hash(this.password, saltRounds);
};

userSchema.methods.validatePassword = async function (password) {
  return await _bcrypt.default.compare(password, this.password);
};

const User = _mongoose.default.model('User', userSchema);

var _default = User;
exports.default = _default;