package DiscordLink {

  function serverCmdMessageSent(%client, %text) {
    %chatData = JettisonObject();
    %chatData.set("type", "string", "Chat");
    %chatData.set("senderName", "string", %client.name);
    %chatData.set("text", "string", %text);

    DiscordLink.transmit(jettisonStringify("object", %chatData));

    Parent::serverCmdMessageSent(%client, %text);
  }
};

deactivatePackage("DiscordLink");
activatePackage("DiscordLink");
