"use strict";

// Requirements
const net = require("net");

// Init
process.title = `Blockland-Discord`;
var pkg = require("../package.json");
console.log("BL-Discord " + pkg.version);

var socket;

const client = net.createConnection({ port: 25625 }, () => {
  console.log("Connecting to Blockland");

  client.write("Init\r\n");
});

client.on("data", (buffer) => {
  console.log(buffer);
  console.log(buffer.toString());
});

client.on("end", () => {
  console.log("Disconnected from Blockland");
});

client.on("error", () => {
  console.log("Failed to connect to Blockland");
});
