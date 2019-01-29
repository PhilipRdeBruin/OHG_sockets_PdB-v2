var lh = location.hash.split('#')[1];
var lhValues = lh.split('&');
var friend = lhValues[1];
var user = lhValues[0];
var room = [user, friend]
var game;
room.sort(function(a, b){
    var nameA=a.toLowerCase(), nameB=b.toLowerCase();
    if (nameA < nameB) //sort string ascending
        return -1; 
    if (nameA > nameB)
        return 1;
    return 0; //default return value (no sorting)
});
room = room[0] + room[1];
var queuesocket = io('http://localhost:3000/queue');
var gameData = {room: room, user: user};
queuesocket.emit('join room', gameData);


var invitedBy;
queuesocket.on('invited', function(data){
    console.log(data)
    game = data[1]
    document.getElementById("modalbg").style.display = "block"
    document.getElementById("invitebuttons").style.display = "block"
    invitedBy = data[0];
    document.getElementById("modalhead").innerHTML = `Invite:`
    document.getElementById("modaltext").innerHTML = `You were invited by ${invitedBy} to play ${game}`
    document.getElementById("input_act_spel").value = 124;
    document.getElementById("input_speler").value = user;
    document.getElementById("hiddenform").action = `http://sockets.styx.gg/${game}.php`;
});
queuesocket.on('confirm', function(data){
    document.getElementById("modalbg").style.display = "block"
    document.getElementById("confirmbuttons").style.display = "block"
    invitedBy = data;
    document.getElementById("modalhead").innerHTML = `Confirmation:`
    document.getElementById("modaltext").innerHTML = `${invitedBy} accepted your invite to play ${game}`
    document.getElementById("input_act_spel").value = 124;
    document.getElementById("input_speler").value = user;
    document.getElementById("hiddenform").action = `http://sockets.styx.gg/${game}.php`;
});
function selectGame(data) {
    game = data.id;
    var select = {data: data.id, friend: friend}
    queuesocket.emit('select game', select)
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