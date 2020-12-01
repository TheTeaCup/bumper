const Discord = require('discord.js');

/**
  * Create our client
  */
const Bumper = new Discord.Client({
  disabledEvents: [
    'CHANNEL_PINS_UPDATE', 
    'RELATIONSHIP_ADD', 
    'RELATIONSHIP_REMOVE', 
    'TYPING_START'
  ],
  messageCacheMaxSize: 100,
  messageCacheLifetime: 240,
  messageSweepInterval: 300,
  fetchAllMembers: true
});

/**
  * Require external files that Bumper needs.
  */
require('./Handlers/EventHandler.js')(Bumper);
require('./Handlers/CommandHandler.js')(Bumper);
require('./Handlers/FunctionHandler.js')(Bumper);

Bumper.Developers = [ 
  '338192747754160138' /* Tea Cup#9999 */
];
Bumper.Staff = [
  '364007557045551106',
  '320602199006642178'
];
Bumper.Website = 'https://mythical-bots-2.glitch.me';

require('./Data/Database.js')(Bumper);
Bumper.Commands = new Discord.Collection();
Bumper.Aliases = new Discord.Collection();

Bumper.Color = '#DAF7A6';
Bumper.ErrorColor = 0xF64465;

module.exports = Bumper;