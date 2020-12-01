 const Discord = require("discord.js");
const Quick = require("quick.db");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
   if (!Bumper.Developers.includes(message.author.id)) return message.channel.send(`You cant use this!`);
    
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!";
  
Bumper.guilds.forEach(g => {
if (!['Discord Bots', 'Plexi Development', 'Discord Bot World', 'botlist.space', 'Bots on Discord', 'Discord Bot List', 'Bots for Discord'].includes(g.name)) {
  let embed = new Discord.RichEmbed()
  
  .setColor(Bumper.Color)
  .setTitle("Big News!")
  .setThumbnail("https://cdn.glitch.com/0ce75f44-0720-4204-9b62-85f1028d9f7a%2FBumpBeta_yellow.png?v=1559845376082")
  .setDescription("Hello Bumper owners, you should have noticed a change in bumper. But there is more on the way, the whole interface of Bumper has been redone, everything on the website can be done with out visiting the website. \n But there is a website in the makes for the bot, but in the mean time please give up feedback. \n Feedback / Support: https://discord.gg/fp4PMrT")
  .addField("Side Note","The old database has been wiped clean due to lots of issue's and more, so please setup you're servers. `b!partner-config`")
  .setFooter("You may recive this message more than once!")
 // message.channel.send(embed)
g.owner.send(embed)
  
    };
  });
  
};

exports.help = {
  name: "owners",
  description: "View the server online",
  usage: "b!owners"
};

exports.conf = {
  Aliases: [] // No Aliases.
};