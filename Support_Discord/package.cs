package DiscordLink {

  function serverCmdMessageSent ( %client, %text ) {
    %chatData = JettisonObject();
    %chatData.set("type", "string", "Chat");
    %chatData.set("senderName", "string", %client.name);
    %chatData.set("text", "string", %text);

    DiscordLinkServer.transmit(jettisonStringify("object", %chatData));

    Parent::chatMessageAll(%sender, %msgString, %a1, %a2, %a3, %a4, %a5, %a6, %a7, %a8, %a9, %a10);
  }
};

deactivatePackage("DiscordLink");
activatePackage("DiscordLink");
