"use strict";

// Requirements
const net = require("net");
const fs = require("fs");
const Discord = require("discord.js");

// Init
process.title = `Blockland-Discord`;
var pkg = require("../package.json");
console.log("\x1b[7m# BL-Discord " + pkg.version + " #\x1b[0m");

// Config loading
var configFile = process.env.CONFIG_FILE || "../config.json";
var config = require(configFile);

// Discord client handling
const discordClient = new Discord.Client();
function parseDiscordInput(data) {
  // TODO
}

discordClient.on("ready", () => {
  console.log("Successfully connected to Discord");
});

discordClient.on("message", parseDiscordInput);

discordClient.login(config.token);

// Server handling
function parseGameInput(data) {
  switch(data.type) {
    case "Handshake":
      console.log("Successfully connected to Blockland");
      break;
    case "Chat":
      console.log("[Game chat] " + data.senderName + ": " + data.text);
      discordClient.channels.fetch(config.channelTemp)
      .then((channel) => {
        channel.send(data.senderName + ": " + data.text);
      });
      break;
  }
}

const server = net.createServer((conn) => {
  var addressInfo = conn.address();

  // Local connections only
  if(addressInfo.address !== "::ffff:127.0.0.1") {
    conn.destroy();
    return;
  }
  conn.pipe(conn);
  console.log("Received connection from Blockland");

  // Write the handshake line
  conn.write("BL\tINIT\n");

  if(typeof socket !== "undefined") {
    socket.destroy();
    console.log("Received new connection, closing the old one...");
  }

  conn.on("data", (buffer) => {
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
});

server.on("error", (err) => {
    throw err;
});

server.listen(25625, () => {
  console.log("Waiting for connection from Blockland server");
});
