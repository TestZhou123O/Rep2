var stompClient=null;
function setConnected(connected) {
   $("#connect").prop("disabled",connected);
   $("#disconnect").prop("disconnect",connected);
   if(connected){
       $("#covercation").show();
       $("#chat").show();
   }else{
       $("#covercation").hide();
       $("#chat").hide();
   }
    $("#greetings").html("");
}


function showGreeting(message) {
    $("#greetings")
        .append("<div>" + message.name+":"+message.content +
            "</div>");
}

function connect() {
    if (!$("#name").val()) {
        return;
    }
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    setConnected(true);
    stompClient.connect({}, function () {
        stompClient.subscribe('/topic/greetings', function (message) {
            showGreeting(JSON.parse(message.body));
        });
    });
}

function disconnect() {
    if(stompClient!==null){
        stompClient.disconnect();
    }
    setConnected(false);
}

function sendMsg() {
    stompClient.send("/app/hello",{},JSON.stringify({'name':$("#name").val(),'content':$("#content").val()}));
}

$(function () {
    $("#connect").click(function () {
        connect();
    });
    $("#disconnect").click(function () {
        connect();
    });
    $("#send").click(function () {
        sendMsg();
    });
})
