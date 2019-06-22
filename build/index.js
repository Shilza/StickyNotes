"use strict";

require("dotenv/config");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _path = _interopRequireDefault(require("path"));

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _models = require("./models");

var _server = require("./server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.resolve(__dirname, '../frontend/build/')));
app.get('*', (req, res) => {
  res.sendFile(_path.default.join(__dirname, '../frontend/build/index.html'));
}); //app.use(morgan('dev'));

_server.server.applyMiddleware({
  app,
  path: '/graphql'
});

const httpServer = _http.default.createServer(app);

_server.server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;
(0, _models.connectDb)().then(async () => {
  httpServer.listen({
    port
  });
});