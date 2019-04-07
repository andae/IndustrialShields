'use strict';

const LogSocket = require('debug')('a2n:socket');
const LogWeb = require('debug')('a2n:web');

const WebServer = require('./lib/web_server');
const Io = require('socket.io')(WebServer);

const SocketServer = require('./lib/socket_server')(Io);

// start the Express App
const server = WebServer.listen(process.env.WEB_PORT || 3000, function() {
  LogWeb('Express server listening on port ' + server.address().port);
});

// start the TCP Socket server
SocketServer.listen(process.env.SOCKET_PORT || 4000, () => {
  LogSocket(`Socket server listening on port ${SocketServer.address().port}`);
});
