const Discord = require('discord.js');
const db = require("quick.db");
var send = require('quick.hook');
const Quick = require("quick.db");

module.exports = async(Bumper, guild) => {
  
     const logsServerLeave2 = Bumper.channels.get('500467259987197985');   
     console.log(`The bot has been left ${guild.name}, Owned by ${guild.owner.user.tag}`);
      const embed = new Discord.RichEmbed()
            .setColor(Bumper.Color)
            .setAuthor(`I have left ${guild.name}`, "https://images-ext-1.discordapp.net/external/qBdcbDveLYsigBBmlqmQVyoRoxv--WLu0d_M3YkWiow/https/dlnbots.github.io/images/leave.png")
            .setThumbnail(guild.iconURL)
            .addField(`${guild.name}`, `I am now in \`${Bumper.guilds.size}\``)
            .setTimestamp()
            .setFooter(`Bumper © Koala Dev 2018-2020`, Bumper.users.get("453601455698608139").avatarURL)
      
       db.delete(`bumps_${guild.id}`)
       logsServerLeave2.setTopic(`Bot Stats: Users ${Bumper.users.size} || Guilds ${Bumper.guilds.size}`)
       send(logsServerLeave2, embed, {
        name: `Bumper Server Logging`,
        icon: `https://cdn.glitch.com/0ce75f44-0720-4204-9b62-85f1028d9f7a%2FBumpBeta_yellow.png?v=1559845376082`
    })
      
  await Bumper.desc.remove(guild.id)
  await Bumper.hidden.remove("hide", guild.id);
  await Bumper.officalServers.remove("Offical", guild.id);
   Quick.delete(`description_${guild.id}`);
   Quick.delete(`pChannel_${guild.id}`);
   Quick.delete(`banner_${guild.id}`);
   Quick.delete(`hex_${guild.id}`);
  
};