$(document).ready(function() {

    var userName = prompt('Please enter your name here:');
    
    
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var button = $('button');


    var addMessage = function(clientObject) {
        var tempName = JSON.stringify(clientObject.name);
        var tempMessage = JSON.stringify(clientObject.message);
        console.log(tempName);
        console.log(tempMessage);
        messages.append('<div>' + tempName +': '+tempMessage+'</div>');
    };
    
    
    


    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
        var name =userName;
        console.log(name);

        var message = input.val();
        addMessage(message);
        var clientObject = {name:userName,message:message};
        socket.emit('clientToServer', clientObject);
        input.val('');
    });
    

    

    
    socket.on('serverToClient', addMessage);


});