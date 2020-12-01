const Discord = require("discord.js");
const Quick = require("quick.db");

module.exports = async(Bumper, message) => {

  if (message.author.bot) return undefined;
  if (message.channel.type != "text") return undefined;
  
  if (message.content === '!join') {
    Bumper.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
  };
  
  if (message.content === '!leave') {
    Bumper.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
  };
  
  let Prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!Prefix)Prefix = "b!";
  
  if (message.content == "<@478730166680420373>") {
    const embed2 = new Discord.RichEmbed()
    .setTitle("You Ring?")
    .setColor(Bumper.Color)
    .setDescription(`Need Help? then do ${Prefix}help!`)
    
    message.channel.send(embed2)
  };
  
  if (message.content.indexOf(Prefix) !== 0) return undefined;
  console.log(`${message.guild.name}[${message.guild.id}] - ${message.author.tag} - ${message.content}`);
  
  let CommandsStatus = await Quick.fetch(`commands_123`);
  if(!CommandsStatus){
    if (Bumper.Developers.includes(message.author.id)) { /* Dev perms */ } else { return message.channel.send("Something cool must be happening, that my Developer has to disable commands."); }
  };
    
  let args = message.content.slice(Prefix.length).trim().split(/ +/g);
  let Command = args.shift().toLowerCase();
  
  let BumperCommand;
	if (Bumper.Commands.has(Command)) { 
    BumperCommand = Bumper.Commands.get(Command);	
  } else if (Bumper.Aliases.has(Command)) { 
    BumperCommand = Bumper.Commands.get(Bumper.Aliases.get(Command));	
  } else {
    return undefined;
  };

	BumperCommand.run(Bumper, message, args);

};