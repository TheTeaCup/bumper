const Discord = require("discord.js");
const Quick = require("quick.db");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!";
  
  let HelpEmbed = new Discord.RichEmbed()
  .setColor(Bumper.Color)
  .setAuthor("Bumper Help Menu")
  .setDescription(`Hi! I\'m Bumper, I can help you grow your server & more.

**__COMMAND LIST__**

**\`${prefix}help\`**: What your seeing now
**\`${prefix}bump\`**: Bump this server
**\`${prefix}bumps\`**: View you\'re server bumps
**\`${prefix}page\`**: View this server online
**\`${prefix}settings\`**: Change your server *(Admin Only)*
**\`${prefix}partner-config\`**: Setup the servers partner info *(Admin Only)*
**\`${prefix}short-description\`**: Set the servers short desc *(Admin Only)*
  `)
  message.channel.send(HelpEmbed);
};

exports.help = {
  name: "help",
  description: "Get help with the bot",
  usage: "b!Help"
};

exports.conf = {
  Aliases: [] // No Aliases.
};