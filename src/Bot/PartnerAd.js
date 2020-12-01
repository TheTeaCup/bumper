const db = require('quick.db');
const Discord = require('discord.js');
const fs = require('fs');
const moment = require("moment");

let no = "Not Set";
let Quick = db

module.exports = async function(Bumper, id) {
  
/* Fetch all server and put them into a map */
let servers = Bumper.guilds.map(g=>g.id);
const serverID = servers[Math.floor(Math.random() * Bumper.guilds.size)];
console.log(`Partner Server ID: ${serverID} Name: ${Bumper.guilds.get(serverID).name}`);
  
/* Fetch partner to send to  */
let partner = Bumper.guilds.get(id);
console.log(`Main Partner ID: ${partner.id} | Name: ${partner.name}`);
  
let channel = await Quick.fetch(`pChannel_${id}`);
if(!channel)return console.log(`ID: ${partner.id} | Name: ${partner.name} has no channel`)
  
let chann = partner.channels.find("name", channel);
if(!chann) {
  Quick.delete(`pChannel_${id}`);
  return;
};
  
/* Fetch Server Info */
let banner = await Quick.fetch(`banner_${serverID}`); 

let description = await Quick.fetch(`description_${serverID}`);
if(!description)return console.log(`ID: ${partner.id} | Name: ${partner.name} has no desc`)
  
let invite = await Quick.fetch(`invite_${serverID}`);
if(!invite) {
  return console.log(`ID: ${partner.id} | Name: ${partner.name} has no inv`)
};
  
let color = Bumper.Color;
let hexcode = await Quick.fetch(`hex_${serverID}`);
if(hexcode) { color = hexcode; };
  
let premium = Bumper.officalServers.get("Offical");
let Data = [];
premium.map(Kiro => { Data.push(Kiro); });
  
let guild = await Bumper.guilds.get(serverID);
  
let partnerEmbed = new Discord.RichEmbed()
.setColor(color)
if(Data.includes(guild.id)) {
partnerEmbed.setAuthor(`${guild.name}`, "https://cdn.discordapp.com/emojis/453784092576841758.png?v=1") 
partnerEmbed.setFooter("Bumper Verifed Server")
} else { 
partnerEmbed.setTitle(`**${guild.name}**`)
partnerEmbed.setFooter("Bumper Auto Partner")
};
  
partnerEmbed.setURL(`https://bumperbot.ml/info/${guild.id}`)
.setDescription(`
      Owner **-** ${guild.owner}
      Members **-** ${guild.memberCount}
      Emojis **-** ${guild.emojis.size}
      Created: **-** ${moment(guild.createdTimestamp).format('MMMM Do YYYY (h:mm a)')}
      ID: **-** ${guild.id}
      
 
      ${description}
       [Join Here](https://discord.gg/${invite})
    `)
    .setImage(banner)
    .setThumbnail(guild.iconURL)
    .setTimestamp()

  chann.send(partnerEmbed).catch(console.log)

  db.set(`lastPartner_${id}`, Date.now());
  
  Bumper.invites.set(guild.id, `https://discord.gg/${invite}`, "invite")
  
};