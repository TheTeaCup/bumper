const Discord = require("discord.js");
const  Quick = require('quick.db');
const Canvas = require("canvas");
const { get } = require('snekfetch');

module.exports = async(Bumper, member) => { // GuildMemberAdd Event.
  let backk;
  let i = await Quick.fetch(`welcomeLog_${member.guild.id}`);
    if (i === null) return undefined;
      
    let channel = member.guild.channels.find("name", i)
    if(!channel)return Quick.delete(`welcomeLog_${member.guild.id}`), console.log("Channel not found");
       
  let message = [ "Cya later", "Come Back Soon!", "Aww sad to see you go." ];
  let msg = message[Math.floor(Math.random() * message.length)];
  
  let back = await Quick.fetch(`welcomeIMG_${member.guild.id}`)
  if(back === null){ backk = "https://cdn.glitch.com/0ce75f44-0720-4204-9b62-85f1028d9f7a%2Fbumper-welcome.png?v=1561759460814" };
  if(back){ backk = back }
      
  const canvas = Canvas.createCanvas(700, 250);
     
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage(`${backk}`)
   ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = '#74037b'
  ctx.strokeRect(0, 0, canvas.width, canvas.height)

  // Slightly smaller text placed above the member's display name
  ctx.font = '22px sans-serif'
  ctx.fillStyle = '#7289DA'
  ctx.fillText('Left the server,', canvas.width / 3.2,canvas.height /2.5)

  // Add an exclamation point here and below
  ctx.fillStyle = '#7289DA'
  ctx.fillText(`${member.user.username}!`, canvas.width / 2.5, canvas.height / 1.8)

  ctx.beginPath()
  ctx.arc(120, 125, 88, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.clip()
     
  const { body: buffer } = await get(member.user.displayAvatarURL);
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 25, 25, 200, 200);

      if (!member.guild.member(Bumper.user).hasPermission('SEND_MESSAGES')) return;
     // if (!member.guild.member(Bumper.user).hasPermission('MANAGE_ROLES')) return;

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'leave-image.png');

  channel.send(`${msg} ${member.user.tag}`,attachment); 
  channel.setTopic(`${member.guild.name} Now has #${member.guild.members.size} members`)
  
};
