const express = require("express");
const server = express();
const routes = require("./routes");

// usando template engine
server.set("view engine", "ejs");

// enable static services
server.use(express.static("public"));

// usar o req.body
server.use(express.urlencoded({ extend: true }));

// routes
server.use(routes);

server.listen(3000, () => console.log("Server running..."));
