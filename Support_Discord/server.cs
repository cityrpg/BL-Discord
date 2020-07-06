function initDiscordLink() {
  if(isObject(DiscordLinkServer) && isObject(DiscordLinkServer.connection)) {
    DiscordLinkServer.connection.disconnect();
    DiscordLinkServer.connection.delete();
  }

  if(isObject(DiscordLinkServer)) {
    DiscordLinkServer.disconnect();
    DiscordLinkServer.delete();
  }

  echo("Creating Discord link listener...");
  %link = new TCPObject(DiscordLinkServer);
  DiscordLinkServer.listen(25625);
}

initDiscordLink();

function DiscordLinkServer::onConnectRequest(%server, %ip, %id) {
  %socket = new TCPobject(DiscordLinkSocket, %id) {
    parent = %server;
  };

  // Local connections only
  if(!isLANAddress(%ip)) {
    %socket.disconnect();
    %socket.delete();
    return;
  }

  DiscordLinkServer.connection = %socket;
  DiscordLinkServer.connection.send("{ \"type\": \"Handshake\"}\n");
}


function DiscordLinkSocket::onLine(%socket, %line) {
  if(%line $= "Init") {
    echo("Successfully connected to the Discord bridge");
  }
}

function DiscordLinkSocket::onDisconnect(%socket) {
  echo("Discord bridge disconnected.");
}
