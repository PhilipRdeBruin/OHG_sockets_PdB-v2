var lh = location.hash.split('#')[1];
var lhValues = lh.split('&');
var user = lhValues[1];
document.getElementById("players").innerHTML = `Welcome, ${user}. Players in queue:`
var game = lhValues[0];
var queuesocket = io('http://localhost:3000/queue');
var gameData = {game: game, user: user};
queuesocket.emit('join room', gameData);

queuesocket.on('queue', function(data){
    var holder = "";
    for(i=0;i<data.length;i++){
        if(data[i] != user){
            holder += `<li class="pointer" onclick="invitePlayer(this)">${data[i]}</li>`;
        }
    }
    if(holder){
    document.getElementById("queue").innerHTML = holder;
    } else {
        document.getElementById("queue").innerHTML = `Queue for ${game} is empty. Please wait or find another game to play`;
    }
});
var invitedBy;
queuesocket.on('invited', function(data){
    document.getElementById("modalbg").style.display = "block"
    document.getElementById("invitebuttons").style.display = "block"
    invitedBy = data;
    document.getElementById("modalhead").innerHTML = `Invite:`
    document.getElementById("modaltext").innerHTML = `You were invited by ${data} to play a game`
    document.getElementById("input_act_spel").value = 123;
    document.getElementById("input_speler").value = user;
    document.getElementById("hiddenform").action = `http://sockets.styx.gg/${game}.php`;
});
queuesocket.on('confirm', function(data){
    document.getElementById("modalbg").style.display = "block"
    document.getElementById("confirmbuttons").style.display = "block"
    invitedBy = data;
    document.getElementById("modalhead").innerHTML = `Confirmation:`
    document.getElementById("modaltext").innerHTML = `${data} accepted your invite to play a game`
    document.getElementById("input_act_spel").value = 123;
    document.getElementById("input_speler").value = user;
    document.getElementById("hiddenform").action = `http://sockets.styx.gg/${game}.php`;
});
function invitePlayer(data) {
    queuesocket.emit('invite', data.innerHTML)
};
function declineInv(){
    queuesocket.emit('response', [0, invitedBy])
    document.getElementById("modalbg").style.display = "none"
    document.getElementById("invitebuttons").style.display = "none"
}
function goToGame(){
    console.log("ok");
    document.getElementById("modalbg").style.display = "none"
    document.getElementById("confirmbuttons").style.display = "none"
    document.getElementById('hiddenform').submit();
}
function acceptInv(){
    queuesocket.emit('response', [1, invitedBy])
    document.getElementById("modalbg").style.display = "none"
    document.getElementById('hiddenform').submit();
}