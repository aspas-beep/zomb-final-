const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let players = {};

io.on("connection", socket => {
    players[socket.id] = { x: 1500, y: 1500 };

    socket.on("move", data => {
        players[socket.id] = data;
    });

    setInterval(() => {
        io.emit("update", players);
    }, 50);

    socket.on("disconnect", () => {
        delete players[socket.id];
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log("rodando"));
