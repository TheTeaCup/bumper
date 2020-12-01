const Discord = require("discord.js");
const Quick = require("quick.db");
const ms = require('parse-ms');
let cooldown = 1.08e+7;
let time = 60000//1.8e+6;

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
    
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!";
  
  let Awaiter = await message.channel.send(`Bumping Server...`);
    
  let channel = await Quick.fetch(`pChannel_${message.guild.id}`);
  if(!channel)return Awaiter.edit(`Your servers Auto Partner Channel is not setup! \n \`${prefix}PC channel\``);
    
  let invite = await Quick.fetch(`invite_${message.guild.id}`);
  if(!invite)return Awaiter.edit(`Your server had an error making an invite please do \n \`${prefix}PC channel\` Again`);
    
  let description = await Quick.fetch(`description_${message.guild.id}`);
  if(!description)return Awaiter.edit(`Please give your server a description! \n \`${prefix}PC description <msg>\``);
  
  if (!Bumper.Developers.includes(message.author.id)) {
  
   let lastDaily = await Quick.fetch(`lastDaily_${message.guild.id}`);
  
    try {
      
      let b = await Quick.fetch(`serverBumps_${message.guild.id}`)
      let am =  + 1
      if(message.guild.owner.id === message.author.id) { cooldown = 3.6e+6 };
      
         if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
      
         let timeObj = ms(cooldown - (Date.now() - lastDaily))
  
         let sEmbed = new Discord.RichEmbed()
         .setColor(Bumper.ErrorColor)
         .setThumbnail("https://cdn.glitch.com/0ce75f44-0720-4204-9b62-85f1028d9f7a%2FBumpBeta.png")
         .addField("Server On Cooldown", `Next bump point will be available in **${timeObj.hours}hrs ${timeObj.minutes}min**`)
         .addField("Cannot Wait", `**Coming Soon**`)
         message.channel.send(sEmbed);
         Awaiter.delete();
    
   } else {
  
  Quick.set(`lastDaily_${message.guild.id}`, Date.now());
  Quick.set(`lastBump_${message.guild.id}`, Date.now());
  Quick.add(`bumps_${message.guild.id}`, 1);
  Quick.add(`userBumps_${message.author.id}_${message.guild.id}`, 1);
  require("../PartnerAd.js")(Bumper, message.guild.id);
     
  Bumper.recent.push("recent", message.guild.id);
     
 /* setTimeout(() => {
     console.log(`( Bot ) Removed ${message.guild.name} (${message.guild.id})`)
     Bumper.recent.remove("recent", message.guild.id)
   }, ms(time)); */
 
  let bumpEmbed = new Discord.RichEmbed()
  .setTitle("Bumped!")
  .setColor(Bumper.Color)
  .setDescription(`**${message.guild.name}** has been bumped! \n Join the support server for support/help - [Click Here](https://discord.gg/fp4PMrT)`)
  .setImage("https://cdn.glitch.com/0ce75f44-0720-4204-9b62-85f1028d9f7a%2Fbump.png")
  .setFooter("Koala INC - Bumper Advertising")
  message.channel.send(bumpEmbed);
  Awaiter.delete();

      };
    } catch(err) {
      return console.log(err);
  };
    
  } else {
    
  Quick.add(`bumps_${message.guild.id}`, 1);
  Quick.set(`lastBump_${message.guild.id}`, Date.now());
  Quick.add(`userBumps_${message.author.id}_${message.guild.id}`, 1);
  require("../PartnerAd.js")(Bumper, message.guild.id);
  Bumper.recent.push("recent", message.guild.id);
  
  let bumpEmbed = new Discord.RichEmbed()
  .setTitle("Developer Bump!")
  .setColor(Bumper.Color)
  .setDescription(`**${message.guild.name}** has been bumped! \n Join the **support server** for support/help - [Click Here](https://discord.gg/fp4PMrT)`)
  .setImage("https://cdn.glitch.com/0ce75f44-0720-4204-9b62-85f1028d9f7a%2Fbump.png")
  .setFooter("Koala INC - Bumper Advertising")
  message.channel.send(bumpEmbed);
  Awaiter.delete();
    
  };
    
};

exports.help = {
  name: "bump",
  description: "Upvote your server.",
  usage: "b!Bump"
};

exports.conf = {
  Aliases: [] // No Aliases.
};