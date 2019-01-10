var app = require('express')();
var mysql = require('mysql');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ohg'
})

io.on('connection', function(socket){
    socket.on('set game', function(game){
        console.log("game set: " + game)
        // Gets join room request
        socket.on('join room', function(room){
            var gamestate = [];
            room = game + room;
            socket.join(room)
            console.log('user connected to room: ' + room);

            db.query('SELECT gamestate FROM bke WHERE id=1')
            .on('result', function(data){
                // Push results onto the notes array
                gamestate = JSON.parse(data['gamestate']);
                io.to(room).emit('game state', gamestate);
            })


            // Gets chat message
            socket.on('game input', function(msg){
                console.log('message in room ' + room + ': ' + msg);
                io.to(room).emit('game msg', msg);
            });
        });
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});