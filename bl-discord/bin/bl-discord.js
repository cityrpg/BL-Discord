"use strict";

// Requirements
const net = require("net");
const fs = require("fs");
const Discord = require("discord.js");

// Init
process.title = `Blockland-Discord`;
var pkg = require("../package.json");
console.log("BL-Discord " + pkg.version);

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

// Game client handling
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

const gameClient = net.createConnection({ port: 25625 }, () => {
  console.log("Connecting to Blockland...");

  gameClient.write("Init\r\n");
});

gameClient.on("data", (buffer) => {
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

gameClient.on("end", () => {
  console.log("Disconnected from Blockland");
});

gameClient.on("error", () => {
  console.log("Failed to connect to Blockland");
});
