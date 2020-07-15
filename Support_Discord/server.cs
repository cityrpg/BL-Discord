exec("./jettison.cs");
exec("./package.cs");

function initDiscordLink() {
  if(!isObject(DiscordLink)) {
    %link = new TCPObject(DiscordLink);
  }

  DiscordLink.connect("127.0.0.1:25625");
}

initDiscordLink();

function DiscordLink::onConnected(%link) {
  echo("Discord bridge connected.");
  %link.send("{ \"type\": \"Handshake\"}\n");
}

// Torque separates the lines for us, so no special handling needed here.
// Output to the bot is a different story, though.
function DiscordLink::onLine(%this, %line) {
  %text = getLine(%line, 0);

  if(getField(%text, 0) $= "BL") {
    if(getField(%text, 1) $= "INIT") {
      echo("Successfully connected to the Discord bridge");
    }
  }
}

function DiscordLink::transmit(%this, %data) {
  // Append a newline so the bot can distunguish individual data.
  %this.send(%data @ "\n");
}


function DiscordLink::onConnectFailed(%link) {
  echo("Discord bridge connection failed.");
}

function DiscordLink::onDisconnect(%link) {
  echo("Discord bridge disconnected.");
}
