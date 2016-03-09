$(document).ready(function() {

    var userName = prompt('Please enter your name here:');
    var socket = io();
    var input = $('input');
    var messages = $('#messages');


    var addMessage = function(clientObject) {
        if (clientObject.hasOwnProperty('enter')) {
            messages.append('<div>' + clientObject.enter + '</div>');
        } else {
            messages.append('<div>' + clientObject.name + ': ' + clientObject.message + '</div>');
        }

    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
        var name = userName;
        var message = input.val();
        var clientObject = { name: userName, message: message };
        addMessage(clientObject);
        socket.emit('clientToServer', clientObject);
        input.val('');
    });

    socket.on('serverToClient', addMessage);

});