'use strict';

const http = require('http');
const Router = require('./lib/router');
// const Note = require('./model/note');
// const storage = require('./lib/storage');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

require('./routes/note-routes.js')(router);

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`));
