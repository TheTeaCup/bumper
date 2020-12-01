  const Discord = require("discord.js");
const Quick = require("quick.db");
const Snekfetch = require("snekfetch");

const Developers = [ "338192747754160138", "488659939170975744", "473938036946894849", "364007557045551106", "374035177846079488", "244492419196911616" ];

module.exports.run = async (Koala, message, args) => { // eslint-disable-line no-unused-vars
  const deniedEmbed = new Discord.RichEmbed()
  .setTitle("Koala")
  .setColor(Koala.Color)
  .setDescription("Sorry, you don't have the \`Koala Developer\` permission.")
  
  if (!Developers.includes(message.author.id)){
    return message.channel.send(deniedEmbed);
  };
  
  if (!args[1] && !args[0]) { return; };
  
  if (args[1]) {
    const x = Koala.guilds.get(args[1]);
    
    if (!x) {
      const GuildList = Koala.guilds.map(g => g.name).join("\n");
      const GuildListID = Koala.guilds.map(g => g.id).join("\n");
          
      message.channel.send("Please supply a valid \`Server ID\`.");

      Snekfetch.post("https://hastebin.com/documents")
      .send(GuildList)
      .then(k => {
        return message.channel.send(`\`Server List\`\n**URL: (https://hastebin.com/${k.body.key})**`);
		  });
          
      await	Snekfetch.post("https://hastebin.com/documents")
		  .send(GuildListID)
			.then(k => {
			  return message.channel.send(`\`Server ID List\`\n**URL: (https://hastebin.com/${k.body.key})**`);
		  });
    };
    
    const Channels = x.channels.map(g => g.id.toString()).join("\n");
    
    await Snekfetch.post("https://hastebin.com/documents")
    .send(Channels)
    .then(k => {
      return message.channel.send(`\`Server Channels List\`\n**URL: [(https://hastebin.com/${k.body.key})**`);
    });
  } else{
    var InvCode = Koala.channels.get(args[0]);
    const Invite = await InvCode.createInvite({ maxAge: 0 }).catch(err => {
      return message.channel.send(`$Error found while generating.\n\`\`\`js\n${err}\n\`\`\``);
    });
    
    return message.channel.send(`\`Server Invite Generated!\`\n**URL: (https://discord.gg/${Invite.code})**`);  
  };
};

exports.help = {
  name: "inv",
  description: "Allows you to make an invite",
  usage: "b!Inv"
};

exports.conf = {
  Aliases: []
};