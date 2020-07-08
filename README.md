# BL-Discord
BL-Discord is an application and add-on for Blockland that connects your Blockland server to a Discord server.

Note that BL-Discord is a work-in-progress. Expect bugs and compatibility-breaking changes between updates. Currently only supports a single Blockland server on a single system.

Check out development progress for BL-Discord on the [Trello Card]().

# Planned Features
- Chat link - Seamless chat between the game and Discord
- Server messages - Show server messages in Discord, including announcements, player joins/leaves, player deaths, etc. with the ability to integrate with add-ons - all individually toggle-able via preferences
- Multiple servers - Link the bot up to multiple Blockland servers, bound to their own channels
- Configure in-game - Once the bot is online, all further options are updated from the preferences panel in-game.
- In-game channel setup - Set-up the channel in-game using a command; no need to copy the ID in Discord itself.
- Custom commands - An API for add-ons to make their own commands for the bot - toggle-able via a preference
- (Advanced) Verification system - For advanced uses, a verification system using MySQL and a Steam login to associate each player with their Discord account
- (Advanced) Role assignment - With verification activated, add-ons in the game can assign roles to users on Discord

# How to Install
More detailed installation instructions will be written soon, but the general idea is:
- [Download and install Node.js](https://nodejs.org/en/download/)
- [Create a bot](https://discord.com/developers/applications), set up its token along with your desired channel ID in config.json (use Discord's developer mode under settings)
- Run the "install" command file in bl-discord/, then start the bot using the "bl-discord" command file.

If done correctly, you will see "connected to Discord" and "connected to Blockland" in the bot's console.
