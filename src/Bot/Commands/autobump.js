const Discord = require("discord.js");
const Quick = require("quick.db");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  
  const Konah = Bumper.emojis.get("456305427236257804");
  const KoHelp = Bumper.emojis.get("456211147406835713");
  
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!";
  
  let SupportServer = Bumper.guilds.get("453600107191861271")
  let Member = message.author;
 
 //if (SupportServer.members.get(Member.id).roles.find("name", "Bumper Premium")) {
    let True = new Discord.RichEmbed()
    .setTitle("Bumper Premium")
    .setColor(Bumper.Color)
    .setDescription("Is this the server you want to \`Auto-Bump\`?")
    .setFooter(`Type: Yes or No`)
    
    const AMFilter = msg => msg.author.id === message.author.id && msg.channel.id === message.channel.id;
    const Awaiter = await message.channel.send(True);
   
    let bb = await Quick.fetch(`autoBump_${message.guild.id}`);
    //console.log(`${message.guild.name} (${message.guild.id} AutoBump ${bb}`);
   
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
      Awaiter.delete();
      let me = await message.channel.send("**Bumper Premium** - Setting up AutoBump for this server!");
      Quick.set(`autoBumpp_${message.guild.id}`, "yes")
      me.edit(`${KoHelp} **| Auto-Bump is now Enabled.**`)   
    };
    
    if (Response.first().content.toLowerCase() === "no"){
      Awaiter.delete();
      Quick.delete(`autoBumpp_${message.guild.id}`)
      return message.channel.send("**Bumper Premium** - Disabled AutoBump.");
    };
    
     }).catch(() => {
    Awaiter.delete();
    return message.channel.send("**Bumper Premium** - Time ran out, canceling AutoBump Setup.");
  });
    
/*  } else {
    let False = new Discord.RichEmbed()
    .setTitle("Bumper Premium")
    .setColor(Color)
    .setDescription("Bumper Premium is \`Not Active\`.\n**Donate:** [Click Here](https://www.patreon.com/koaladevelopment)")
    .setFooter("Note: Bumper Premium will be activated after your purchase.")
    
    return message.channel.send(False);
  };
  */
};

exports.help = {
  name: "autobump",
  description: "Automatically bump your server.",
  usage: "b!AutoBump"
};

exports.conf = {
  Aliases: [ "ab" ] // No Aliases.
};