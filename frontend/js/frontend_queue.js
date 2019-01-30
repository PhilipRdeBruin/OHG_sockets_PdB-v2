var gamesAvailable = {
    bke: 2,
    mastermind: 2,
    chess: 2,
    voer: 4,
    template: 2
};

var lh = location.hash.split('#')[1];
var lhValues = lh.split('&');
var user = lhValues[1];
document.getElementById("players").innerHTML = `Welcome, ${user}. Players in queue:`
var game = lhValues[0];
var players=[user]
var queuesocket = io('http://localhost:3000/queue');
var gameData = {room: game, user: user};
var acceptQueue = {}
queuesocket.emit('join room', gameData);

queuesocket.on('queue', function(data){
    var holder = "";
    for(i=0;i<data.length;i++){
        if(data[i] != user){
            holder += `<li class="pointer" onclick="selectPlayer(this)">${data[i]}</li>`;
        }
    }
    if(holder){
    document.getElementById("queue").innerHTML = holder;
    } else {
        document.getElementById("queue").innerHTML = `Queue for ${game} is empty. Please wait or find another game to play`;
    }
});


function selectPlayer(x){
    if(x.className == "pointer selected") {
        x.className = "pointer";
        players.splice(players.indexOf(x.innerHTML), 1);
    } else if (players.length < gamesAvailable[game]) {
        x.className = "pointer selected"
        players.push(x.innerHTML);
    }
    if(players.length < gamesAvailable[game]){
        document.getElementById("invite").style.display = "none";
    } else {
        document.getElementById("invite").style.display = "block"}
}
function renderStatus(){
    let holder = "";
    console.log(acceptQueue);
    for(i=0;i<Object.keys(acceptQueue).length;i++){
        holder += `<div id="_${Object.keys(acceptQueue)[i]}" class="queuestatus ${acceptQueue[Object.keys(acceptQueue)[i]]}"></div>`
    }
    document.getElementById("status").innerHTML = holder;
    if(acceptQueue[user] == ""){
        document.getElementById("invitebuttons").style.display = "block"
    }
    var accepted = document.getElementsByClassName("accepted");
    if(accepted.length == gamesAvailable[game]) {
        document.getElementById("confirmbuttons").style.display = "block"
    }
}


var invitedBy;
queuesocket.on('invited', function(data){
    document.getElementById("modalbg").style.display = "block"
    invitedBy = data;
    for(i=0;i<data.length;i++){
        acceptQueue[data[i]] = "";
    }
    acceptQueue[Object.keys(acceptQueue)[0]] = "accepted";
    renderStatus();
    document.getElementById("modalhead").innerHTML = `Invite:`
     document.getElementById("modaltext").innerHTML = `Game by ${data[0]}, waiting for players:`
    document.getElementById("input_act_spel").value = 124;
    document.getElementById("input_speler").value = user;
    document.getElementById("hiddenform").action = `http://sockets.styx.gg/${game}.php`;
});
queuesocket.on('confirm', function(data){
    acceptQueue[data] = "accepted";
    renderStatus();
    // document.getElementById("modalbg").style.display = "block"
    // document.getElementById("confirmbuttons").style.display = "block"
    // invitedBy = data;
    // document.getElementById("modalhead").innerHTML = `Confirmation:`
    // document.getElementById("modaltext").innerHTML = `${data} accepted your invite to play a game`
    // document.getElementById("input_act_spel").value = 124;
    // document.getElementById("input_speler").value = user;
    // document.getElementById("hiddenform").action = `http://sockets.styx.gg/${game}.php`;
});
queuesocket.on('decline', function(data){
    acceptQueue[data] = "declined";
    renderStatus();
    // document.getElementById("modalbg").style.display = "block"
    // document.getElementById("confirmbuttons").style.display = "block"
    // invitedBy = data;
    // document.getElementById("modalhead").innerHTML = `Confirmation:`
    // document.getElementById("modaltext").innerHTML = `${data} accepted your invite to play a game`
    // document.getElementById("input_act_spel").value = 124;
    // document.getElementById("input_speler").value = user;
    // document.getElementById("hiddenform").action = `http://sockets.styx.gg/${game}.php`;
});
function invitePlayers() {
    queuesocket.emit('invite', players);
};
function declineInv(){
    queuesocket.emit('response', [0, invitedBy]);
    document.getElementById("modalbg").style.display = "none";
    document.getElementById("invitebuttons").style.display = "none";
}
function goToGame(){
    console.log("ok");
    document.getElementById("modalbg").style.display = "none";
    document.getElementById("confirmbuttons").style.display = "none";
    document.getElementById('hiddenform').submit();
}
function acceptInv(){
    queuesocket.emit('response', [1, invitedBy]);
    document.getElementById("invitebuttons").style.display = "none";
}