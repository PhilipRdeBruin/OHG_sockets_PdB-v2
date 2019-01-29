var queuesocket = io('http://localhost:3000/queue');


playerCount();
function playerCount(){
    var games = document.getElementsByClassName("game");
    for(i=0;i<games.length;i++){
        console.log(games[i].id);
        queuesocket.emit('get players', games[i].id);
    }
}


queuesocket.on('player amount', function(amount){
   document.getElementById(amount[0]).innerHTML = amount[1]
});
 