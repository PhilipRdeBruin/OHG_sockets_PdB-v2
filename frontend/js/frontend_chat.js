// var lh = location.hash.split('#')[1];
// var lhValues = lh.split('&');
// var room = lhValues[1];
// var user = lhValues[0];

var chatsocket = io('http://localhost:3000/chat');
var chatData = {room: room, user: user};


function scrollDown(x){
    if(x.scrollHeight-x.scrollTop> x.clientHeight*2){
        document.getElementById("scrolldown").style.display = "block"
    } else {
        document.getElementById("scrolldown").style.display = "none"
    }
}

function scrollNow(){
    var chatText = document.getElementById("chattext")
    chatText.scrollTop = chatText.scrollHeight;
}



chatsocket.emit('join room', chatData);
chatsocket.on('chat history', function(msg){
    var chatText = document.getElementById("chattext")
    for(i=0;i<msg.length;i++){ 
        chatText.innerHTML+= `${msg[i]} <br>`;
        chatText.scrollTop = chatText.scrollHeight;
    }
    document.getElementById("chattext").style.scrollBehavior= "smooth";
})

var chatinput = document.getElementById('chatinput');
chatinput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && chatinput.value != "") {
        chatsocket.emit('msg', chatinput.value);
        chatinput.value = "";
    }
});

chatsocket.on('msg', function(msg){
    var chatText = document.getElementById("chattext")
    chatText.innerHTML+= `${msg} <br>`;
    chatText.scrollTop = chatText.scrollHeight;
})