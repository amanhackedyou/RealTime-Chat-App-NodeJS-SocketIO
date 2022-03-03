// const { Socket } = require("socket.io");

const socket = io();

let name;
do{
    name = prompt("Enter your name...");
}
while (!name);

function append(msg){
    let cont = document.getElementById("msgCont");
    cont.innerHTML += `<div class="message left">${msg}</div>`;
}

socket.emit("new-user-joined", name);

socket.on("joined", name => {
    append(`<b>${name}</b> joined the chat.`);
});

socket.on("recieve", data => {
    append(`<b>${data.name} </b>: ${data.msg}`);
});

socket.on("user-left", name => {
    append(`<b>${name}</b> left the chat.`);
});
function send(){
    let cont = document.getElementById("msgCont");
    let msg = document.getElementById("input");
    cont.innerHTML += `<div class="message right">${msg.value}</div>`;
    socket.emit("send", {"name": name, "msg": msg.value});
    msg.value="";

}