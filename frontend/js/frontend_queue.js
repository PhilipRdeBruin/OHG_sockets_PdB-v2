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
var players = [user]
var queuesocket = io('http://localhost:3000/queue');
var gameData = {
    room: game,
    user: user,
    available: "available"
};
var acceptQueue = {}
queuesocket.emit('join room', gameData);

queuesocket.on('queue', function(data) {
    var holder = "";
    for (i = 0; i < Object.keys(data).length; i++) {
        if (Object.keys(data)[i] != user) {
            if (data[Object.keys(data)[i]][2] == "available") {
                var classes = `class="pointer available"`;
                var onclick = `onclick="selectPlayer(this)"`
            } else {
                var classes = `class="unavailable"`;
                var onclick = ""
            }
            holder += `<li ${classes} ${onclick}>${Object.keys(data)[i]}</li>`;
        }
        if (players.indexOf(Object.keys(data)[i]) > 0 && data[Object.keys(data)[i]][2] == "unavailable") {
            var selected = document.getElementById("queue").childNodes
            for (i = 0; i < selected.length; i++) {
                if (selected[i].classList.contains("selected")) {
                    selected[i].classList.remove("selected");
                }
            }
            players = players.splice(Object.keys(data)[i], 1);
            document.getElementById("invite").style.display = "none";
        }
    }
    if (holder) {
        document.getElementById("queue").innerHTML = holder;
    } else {
        document.getElementById("queue").innerHTML = `Queue for ${game} is empty. Please wait or find another game to play`;
    }
});

var invitedBy;

queuesocket.on('invited', function(data) {
    console.log(data);
    document.getElementById("modalbg").style.display = "block"
    invitedBy = data;
    acceptQueue = {};
    for (i = 0; i < data.length; i++) {
        acceptQueue[data[i]] = "";
    }
    acceptQueue[Object.keys(acceptQueue)[0]] = "accepted";
    renderStatus();
    document.getElementById("modalhead").innerHTML = `Invite:`
    document.getElementById("modaltext").innerHTML = `Game by ${data[0]}, waiting for players:`
    document.getElementById("input_act_spel").value = 124;
    document.getElementById("input_speler").value = user;
    document.getElementById("hiddenform").action = `http://sockets.styx.gg/${game}.php`;
    var selected = document.getElementById("queue").childNodes
    for (i = 0; i < selected.length; i++) {
        if (selected[i].classList.contains("selected")) {
            selected[i].classList.remove("selected");
        }
    }
    players = [user];
    document.getElementById("invite").style.display = "none";
});

queuesocket.on('confirm', function(data) {
    acceptQueue[data] = "accepted";
    renderStatus();
});

queuesocket.on('decline', function(data) {
    acceptQueue[data] = "declined";
    renderStatus();
    document.getElementById("confirmbuttons").style.display = "none";
});

function invitePlayers() {
    queuesocket.emit('invite', players);
};

function declineInv() {
    queuesocket.emit('response', [0, invitedBy]);
    document.getElementById("modalbg").style.display = "none";
    document.getElementById("invitebuttons").style.display = "none";
    document.getElementById("closebuttons").style.display = "none"
};

function goToGame() {
    document.getElementById("modalbg").style.display = "none";
    document.getElementById("confirmbuttons").style.display = "none";
    document.getElementById("closebuttons").style.display = "none"
    document.getElementById('hiddenform').submit();
};

function acceptInv() {
    queuesocket.emit('response', [1, invitedBy]);
    document.getElementById("invitebuttons").style.display = "none";
    document.getElementById("closebuttons").style.display = "none"
};

function selectPlayer(x) {
    if (x.classList.contains("selected")) {
        x.classList.remove("selected");
        players.splice(players.indexOf(x.innerHTML), 1);
    } else if (players.length < gamesAvailable[game]) {
        x.classList.add("selected");
        players.push(x.innerHTML);
    }
    if (players.length < gamesAvailable[game]) {
        document.getElementById("invite").style.display = "none";
    } else {
        document.getElementById("invite").style.display = "block"
    }
};

function renderStatus() {
    let holder = "";
    for (i = 0; i < Object.keys(acceptQueue).length; i++) {
        holder += `<div id="_${Object.keys(acceptQueue)[i]}" class="queuestatus ${acceptQueue[Object.keys(acceptQueue)[i]]}"></div>`
        if (acceptQueue[Object.keys(acceptQueue)[i]] == "declined" && document.getElementById("modalbg").style.display == "block") {
            document.getElementById("closebuttons").style.display = "block"
        }
    }
    document.getElementById("status").innerHTML = holder;
    if (acceptQueue[user] == "" && acceptQueue[user] != null) {
        document.getElementById("closebuttons").style.display = "none"
        document.getElementById("invitebuttons").style.display = "block"
    }
    var accepted = document.getElementsByClassName("accepted");
    if (accepted.length == gamesAvailable[game]) {
        document.getElementById("closebuttons").style.display = "none"
        document.getElementById("confirmbuttons").style.display = "block"
    }
};

function closeQ() {
    queuesocket.emit('response', [0, invitedBy]);
    document.getElementById("modalbg").style.display = "none";
    document.getElementById("closebuttons").style.display = "none";
}