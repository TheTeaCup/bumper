const Discord = require("discord.js");
const Quick = require("quick.db");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  
  const Konah = Bumper.emojis.get("456305427236257804");
  const KoHelp = Bumper.emojis.get("456211147406835713");
  
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!";
  
  if (Bumper.Developers.includes(message.author.id)) {
    if(!args[0]) { 
       message.channel.send(`Please type eiter, \`${prefix}commands enable\` **Or** \`${prefix}commands disable\``);
    };
    
    if(args[0] === "enable") {
      message.channel.send(`${KoHelp} **Enabled Commands.**`);
      Quick.set(`commands_123`, 1) ;
    };
    
   if(args[0] === "disable") { 
      message.channel.send(`${KoHelp} **Disabled Commands.**`);
      Quick.delete(`commands_123`);
    }; 
    
     } else {
    message.channel.send(`${Konah} **Command is Dev locked.**`);
  };
};

module.exports.help = {
  name: "commands",
  description: "Shows Bumpers Commands.",
  usage: "b!Commands"
}
exports.conf = {
  Aliases: [ ]
};