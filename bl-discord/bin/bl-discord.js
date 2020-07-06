"use strict";

// Requirements
const net = require("net");

// Init
process.title = `Blockland-Discord`;
var pkg = require("../package.json");
console.log("BL-Discord " + pkg.version);

function parseGameInput(data) {
  switch(data.type) {
    case "Handshake":
      console.log("Successfully connected to Blockland");
      break;
    case "Chat":
      console.log("[Game chat] " + data.senderName + ": " + data.text);
      break;
  }
}

const client = net.createConnection({ port: 25625 }, () => {
  console.log("Connecting to Blockland...");

  client.write("Init\r\n");
});

client.on("data", (buffer) => {
  if(!buffer.toString().endsWith("\n")) {
    warn("WARNING: Received potentially incomplete data from Blockland.");
  }

  var strings = buffer.toString().split("\n");

  var data;
  for(var i in strings) {
    // Blank line ending indicates the end of the data -- ignore it.
    if(strings[i] == "") {
      return;
    }

    try {
      data = JSON.parse(strings[i]);
    }
    catch(err) {
      console.warn("Invalid input from Blockland (" + err.message + ")");
      console.warn(strings[i]);
      return;
    }

    parseGameInput(data);
  }
});

client.on("end", () => {
  console.log("Disconnected from Blockland");
});

client.on("error", () => {
  console.log("Failed to connect to Blockland");
});
