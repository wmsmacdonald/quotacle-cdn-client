#!/usr/bin/env node

var net = require('net');

//var HOST = '127.0.0.1';
var HOST = 'fgen.quotacle.com';
var PORT = 5340;

var client = new net.Socket();

var startTime;
client.connect(PORT, HOST, function() {
  startTime = new Date().getTime();

  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
  client.write('I am Chuck Norris!');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {


  console.log('DATA: ' + data);
  console.log('duration: %d', (new Date().getTime() - startTime) / 1000);
  // Close the client socket completely
  //client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
  console.log('Connection closed');
});


module.exports = {
  getThumbnailDataUri: function getThumbnailDataUri(movieId, time, callback) {
    client.write(JSON.stringify({ thumbnail: { movieId: movieId, time: time } }));
    client.on('data', function(data) {

    });
  }
};