'use strict';

const http = require('http');
const Router = require('./lib/router');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

require('./routes/note-routes.js')(router);

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`));
