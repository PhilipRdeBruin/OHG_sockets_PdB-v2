var lh = location.hash.split('#')[1];
var lhValues = lh.split('&');
var room = lhValues[1];
var user = lhValues[0];

var queuesocket = io('http://localhost:3000/queue');
var chatData = {room: room, user: user};
queuesocket.emit('join room', chatData);


queuesocket.on('iets', function(data){
})