function initDiscordLink() {
  if(!isObject(DiscordLink)) {
    %link = new TCPObject(DiscordLink);
  }

  DiscordLink.connect("127.0.0.1:25625");
}

initDiscordLink();

function DiscordLink::onConnected(%link) {
  echo("Discord bridge connected.");
  %link.send("{ type: \"Handshake\"}");
}

function DiscordLink::onLine(%link) {
  echo("line");
}

function DiscordLink::onConnectFailed(%link) {
  echo("Discord bridge connection failed.");
}

function DiscordLink::onDisconnect(%link) {
  echo("Discord bridge disconnected.");
}
