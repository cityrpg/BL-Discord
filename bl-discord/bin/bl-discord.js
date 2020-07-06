"use strict";

// Requirements
const net = require("net");

// Init
process.title = `Blockland-Discord`;
var pkg = require("../package.json");
console.log("BL-Discord " + pkg.version);

var socket;

const server = net.createServer((conn) => {
  var addressInfo = conn.address();

  // Local connections only
  if(addressInfo.address !== "::ffff:127.0.0.1") {
    conn.destroy();
    return;
  }
  conn.pipe(conn);
  console.log("Received connection from Blockland");

  conn.write("Init");

  if(typeof socket !== "undefined") {
    socket.destroy();
    console.log("Received new connection, closing the old one...");
  }

  conn.on("data", (buffer) => {
    console.log(buffer);
    console.log(buffer.toString());
  });
});

server.on("error", (err) => {
    throw err;
});

server.listen(25625, () => {
  console.log("Server listening");
});
