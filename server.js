var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var totalUsers = 0;

    io.on('connection', function (socket) {
        totalUsers++;
        socket.broadcast.emit('message', 'User has connected; totalUsers:  ' +totalUsers+'');
        console.log(socket.id);
        
        socket.on('message', function(message) {
            console.log('Received message:', message);
            socket.broadcast.emit('message', message);
        });
        
        socket.on('disconnect', function(){
            totalUsers--;
            socket.broadcast.emit('message', 'User has disconnected; totalUsers:' +totalUsers+'');
        });
        
        

    });
    


server.listen(8080);