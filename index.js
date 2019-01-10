var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.get('/1', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    socket.on('set game', function(game){
        console.log("game set: " + game)
        // Gets join room request
        socket.on('join room', function(room){
            room = game + room;
            socket.join(room)
            console.log('user connected to room: ' + room);
            // Gets chat message
            socket.on('chat message', function(msg){
                console.log('message in room ' + room + ': ' + msg);
                io.to(room).emit('chat message', msg);
            });
        });
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});