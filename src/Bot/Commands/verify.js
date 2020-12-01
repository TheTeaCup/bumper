const Discord = require("discord.js");
const Quick = require("quick.db");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  
const Konah = Bumper.emojis.get("456305427236257804");
const KoHelp = Bumper.emojis.get("456211147406835713");
const KoVer = Bumper.emojis.get("523867355147665408");
  
if (!Bumper.Developers.includes(message.author.id)) return message.channel.send(`Command Locked to Dev ONLY`);
    
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!";
  
  let Color = Bumper.Color;
  
  let guild = message.guild
  
   let True = new Discord.RichEmbed()
    .setTitle("Bumper Premium")
    .setColor(Color)
    .setDescription("Is this the server you want to \`Verify\`?")
    .setFooter(`Type: Yes or No`)
    
    const AMFilter = msg => msg.author.id === message.author.id && msg.channel.id === message.channel.id;
    const Awaiter = await message.channel.send(True);
    
    const Answers = ["yes","no"];
    let y = "yes"
    
  message.channel.awaitMessages(AMFilter, {
    max: 1,
    time: 15000
  }).then(async Response => {
    
    if(!Answers.includes(Response.first().content.toLowerCase())){
      return message.channel.send("**Bumper** - Not a valid response, canceling Bumper's \`AutoBump\` Setup.");
    };
    
    if (Response.first().content.toLowerCase() === "yes"){
      Bumper.officalServers.push("Offical", guild.id);
      return message.channel.send("**Bumper** - Server now verified in Koala INC "+ KoVer);
    };
    
    if (Response.first().content.toLowerCase() === "no"){
      Bumper.officalServers.remove("Offical", guild.id);
      return message.channel.send("**Bumper** - Server no longer verified.");
    };
    
     }).catch(() => {
    return message.channel.send("**Bumper** - Time ran out, canceling AutoBump Setup.");
  });
  
};


exports.help = {
  name: "verify",
  description: "Gives The users bump stats.",
  usage: "b!Verify"
};

exports.conf = {
  Aliases: [ "v" ] // No Aliases.
};