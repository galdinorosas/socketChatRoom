var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var totalUsers = 0;

io.on('connection', function(socket) {
    totalUsers++;
    socket.broadcast.emit('serverToClient', { 'enter': 'User has connected; totalUsers:  ' + totalUsers + '' });
    console.log(socket.id);

    socket.on('clientToServer', function(clientObject) {
        console.log('Received message and name:', clientObject);
        socket.broadcast.emit('serverToClient', clientObject);
    });

    socket.on('disconnect', function() {
        totalUsers--;
        socket.broadcast.emit('serverToClient', {enter:'User has disconnected; totalUsers:' + totalUsers + ''});
    });

});

server.listen(8080, function(){
    console.log('Please navigate to http://localhost:8080');
});