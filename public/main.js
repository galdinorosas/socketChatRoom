$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var button = $('button');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };
    
    var totalUsers = function(usersOnline){
        messages.append('<div>' + usersOnline + '</div>')
    };
    


    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        console.log(socket);

        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    
    button.on('click', function(){
        
        socket.disconnected();
    });
    

    
    socket.on('message', addMessage);


});