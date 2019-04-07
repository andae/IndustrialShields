'use strict';

const ClientLog = require('debug')('a2n:socket:client');
const ClientError = require('debug')('a2n:socket:client:error');
const Net = require('net');
const Stream = require('stream');

let Io; //Socket.io instance

const onEndConnection = () => {
  ClientLog('Client disconnected');
};

const onError = (err) => {
  ClientError(err.message);
};

//split json to allow parse
const splitStream = new Stream.Transform({
  transform: function(chunk, encoding, callback) {
    const text = chunk.toString();
    const re = /(\{[^\}]*\})/;
    const jsonArr = text.split(re).filter((j) => j != '');

    jsonArr.map((j) => this.push(j));

    callback();
  }
});

//send to browser through socket.io
const browserStream = new Stream.Writable({
  write: function(chunk, encoding, callback) {
    ClientLog(`Client sent: ${chunk.toString()}`);

    const json = JSON.parse(chunk.toString());
    Io.emit('arduino:message', json);

    callback();
  }
});

module.exports = (io) => {
  Io = io;

  return Net.createServer((client) => {
    ClientLog(`Client connected from ${client.remoteAddress}`);

    client.on('end', onEndConnection);
    client.on('error', onError);

    client
      .pipe(splitStream)
      .pipe(browserStream);
  });
};
