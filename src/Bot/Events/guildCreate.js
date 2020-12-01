const Discord = require('discord.js');
var send = require('quick.hook');

module.exports = async(Bumper, guild) => {   
  
         console.log(`The bot just joined to ${guild.name}, Owned by ${guild.owner.user.tag}`);  
         const logsServerJoin2 = Bumper.channels.get('500467259987197985');
         let a = "Welcome!";
  
            const embed = new Discord.RichEmbed()
            .setColor(Bumper.Color)
            .setAuthor(`i Joined ${guild.name}`, "https://images-ext-1.discordapp.net/external/3vb7X0yysUyIs3XxOs6s0X-gB6PH8PG80rFbv_7iQeI/https/dlnbots.github.io/images/join.png")
            .setThumbnail(guild.iconURL)
            .setURL("https://bumperbot.ml/info/" + guild.id )
            .addField(`${guild.name}`, `I am now in \`${Bumper.guilds.size}\``)
            .addField("Member Info", `**Total Users Count:** \`${guild.memberCount}\`\n\n**Member Count:** \`${guild.members.filter(member => !member.user.bot).size}\`\n**Bot Count:** \`${guild.members.filter(member => member.user.bot).size}\``, true)
            .addField("Server Info", `**Owner:** \`${guild.owner.user.tag}\`\n**Host Region:** \`${guild.region}\`\n**Verification Level:** \`${guild.verificationLevel}\`\n**Server ID:** \`${guild.id}\``, true)
            .setTimestamp()
            .setFooter(`Bumper © Koala Dev 2018-2020`, Bumper.users.get("453601455698608139").avatarURL)
            logsServerJoin2.setTopic(`Bot Stats: Users ${Bumper.users.size} || Guilds ${Bumper.guilds.size}`)
  

     send(logsServerJoin2, embed, {
        name: `Bumper Server Logging`,
         icon: `https://cdn.glitch.com/0ce75f44-0720-4204-9b62-85f1028d9f7a%2FBumpBeta_yellow.png?v=1559845376082`
    })

  Bumper.desc.set(guild.id, "gg",'desc')
  
};