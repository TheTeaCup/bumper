const Discord = require('discord.js');

exports.run = async(Bumper, message, args) => {
  return message.channel.send('Pinging...').then((msg) => {
    msg.edit(`Websocket: **\`${Math.round(Bumper.ping)}ms\`**`);
  });
}

exports.help = {
  name: 'ping',
  description: 'Gives the websocket latency.',
  usage: 'b!Ping'
}

exports.conf = {
  Aliases: []
}