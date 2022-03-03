const express = require("express");
const {Server} = require("socket.io");
const http = require("http");

// USERS ONLIME LIST
const users = {}

// EXPRESS SERVER CONFIGURE
const app = express();
const server = http.createServer(app);

// SOCKET.IO SERVER CONFIGURE
const io = new Server(server);
io.on("connection", socket => {

    socket.on("disconnect", name => {
        socket.broadcast.emit("user-left", users[socket.id]);
        // console.log(users.nm+" is disconnected.")
        delete users[socket.id];
    });

    socket.on("new-user-joined", name => {
        // users["nm"] = name;
        users[socket.id] = name;
        // console.log(`${name} has joined the chat!`)
        socket.broadcast.emit("joined", name);
    });

    socket.on("send", data => {
        socket.broadcast.emit("recieve", data);
    });

});

// SOCKET.IO END

// FILE AND TEMPLATE CONFIGURATION
app.use("/static", express.static("static"));
app.set("view engine", "pug");
app.set("views", "templates");

// HENDLING ROUTES
app.get("/", (req, res) => {
    res.status(200).render("index.pug");
});

// LISTEN TO THE SERVER
server.listen(process.env.PORT || 8080, () => {
    console.log("Server running...");
});