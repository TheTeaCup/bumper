const Discord = require("discord.js");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
    
let Guild = Bumper.guilds.get("453600107191861271");
let Role = Guild.roles.find("name", "Koala Testers");
if(!Role)return message.channel.send("Oopsie, Tea Cup an Oopsie Doopsie!! Tell him to add the role \`Koala Testers\`.");
if(!message.guild.id === Guild.id)return message.channel.send("Oops, This only works in the server Koala Development \n https://discord.gg/fp4PMrT");
  
     if (message.guild.members.get(message.author.id).roles.find("name", "Koala Testers")) {
        
         message.member.removeRole(Role.id).catch(console.log);
         message.channel.send(`Removed you from \`Koala Testers\``);
         
        } else {
        
          message.member.addRole(Role.id).catch(console.log);
          message.channel.send(`Added \`Koala Testers\` to you`);
          
       };
  
};

exports.help = {
  name: "beta",
  description: "Get acsess to my beta program.",
  usage: "b!Beta"
};

exports.conf = {
  Aliases: [] // No Aliases.
};