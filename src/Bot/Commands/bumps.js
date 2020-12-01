const Discord = require("discord.js");
const Quick = require("quick.db");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
    
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!";
  
  let sEmbed = new Discord.RichEmbed()
  .setColor(Bumper.ErrorColor)
  .setThumbnail("https://cdn.glitch.com/0ce75f44-0720-4204-9b62-85f1028d9f7a%2FBumpBeta.png")
  .addField("Oops", `I ran into an error trying to fetch you\'re bumps, please upvote the server. \`${prefix}bump\``)
  
  let bumps = await Quick.fetch(`bumps_${message.guild.id}`);
  if(!bumps)bumps = "0";
  
  let urBumps = await Quick.fetch(`userBumps_${message.author.id}_${message.guild.id}`);
  if(!urBumps)return message.channel.send(sEmbed);
  
  let bumpEmbed = new Discord.RichEmbed()
  .setColor(Bumper.Color)
  .setThumbnail(message.author.avatarURL)
  .addField("Bump Statistics",`\`Server Bumps:\` **${bumps}** \n \`Your Bumps:\` **${urBumps}**`)
  .setFooter("Upvote the server for more!", "https://cdn.glitch.com/0ce75f44-0720-4204-9b62-85f1028d9f7a%2FBumpBeta_yellow.png")
  message.channel.send(bumpEmbed);
  
};

exports.help = {
  name: "bumps",
  description: "Show you\'re bumps.",
  usage: "b!Bumps"
};

exports.conf = {
  Aliases: [] // No Aliases.
};