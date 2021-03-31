const express = require("express");
const server = express();

server.get("/", (req, res) => {
        console.log("Entrei no index");

        return res.sendFile(__dirname + "/views/index.html"); 
});


server.listen(3000, () => console.log("Server running..."));
