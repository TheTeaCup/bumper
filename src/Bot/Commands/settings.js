const Discord = require("discord.js");
const Quick = require("quick.db");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
    
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  
  let logg = ``;
  let msgg = ``;
  let imgg = ``;
  let aud = ``;
  let mod = ``;
  let pre = ``;
  let lvl = ``;
  let lvlChan = ``;
  let remind = ``;
  
  if(!prefix)prefix = "b!", pre = `\`${prefix}settings prefix <PreFix>\` **-** Set the bots prefix.`;
  if(prefix)pre = `Set to \`${prefix}\` To remove: \`${prefix}settings prefix delete\``;
  
  let log = await Quick.fetch(`welcomeLog_${message.guild.id}`);
  if(!log) logg = `\`${prefix}settings log <channelName>\` **-** Setup your welcome log `;
  if(log) { 
   let channel = message.guild.channels.find("name", log)
   
   if(!channel) {
     Quick.delete(`welcomeLog_${message.guild.id}`);
     logg = `\`${prefix}settings log <channelName>\` **-** Setup your welcome log `;
   };
    logg = `Welcome Log: \`${channel.name}\` To remove: \`${prefix}settings log delete\``
  };
  
  let reminder = await Quick.fetch(`reminderLog_${message.guild.id}`);
  if(!reminder) remind = `\`${prefix}settings remind <channelName>\` **-** Setup your reminder log`;
  
  if(reminder) {
    
  let channel = message.guild.channels.find("name", reminder)
   
   if(!channel) {
     Quick.delete(`reminderLog_${message.guild.id}`);
     remind = `\`${prefix}settings remind <channelName>\` **-** Setup your reminder log `;
   };
    remind = `Remind Log: \`${channel.name}\` To remove: \`${prefix}settings remind delete\``
    
  };
  
  let msg = await Quick.fetch(`welcomeMSG_${message.guild.id}`);
  if(!msg) msgg = `\`${prefix}settings msg <WelcomeMsg>\` **-** Set your welcome message.`;
  if(msg) msgg = `Welcome Message: ${msg} To remove \`${prefix}settings msg delete\``;
  
  let pic = await Quick.fetch(`welcomeIMG_${message.guild.id}`);
  if(!pic) imgg = `\`${prefix}settings img <URL>\` **-** Set your welcome image.`;
  if(pic) imgg = `Set to: ${pic} To remove: \`${prefix}settings img delete\``;
  
  let audit = await Quick.fetch(`auditLog_${message.guild.id}`);
  if(!audit) aud = `\`${prefix}settings audit <channelName>\` **-** Set your audit log to record things.`;
  if(audit) aud = `Audit-Log: ${audit} To remove: \`${prefix}audit delete\``;
  
  let modlo = await Quick.fetch(`modLog_${message.guild.id}`);
  if(!modlo) mod = `\`${prefix}settings mod <channelName>\` **-** Set your mod log to show your moderation.`;
  if(modlo) mod = `Mod-Log: ${modlo} To remove: \`${prefix}mod delete\``;
  
  let lvling = await Quick.fetch(`leveling_${message.guild.id}`);
  if(!lvling) lvl = `\`${prefix}settings lvl enable\` **-** Enable leveling for your server.`;
  if(lvling) lvl = `Leveling is enabled To Disbled: \`${prefix}settings lvl disable\``;
  
  let lvlChannel = await Quick.fetch(`levelingChannel_${message.guild.id}`);
  if(!lvlChannel) { lvlChan = `\`${prefix}settings lvl-log <levelChanel>\`` }
  if(lvlChannel) {
    
     let channel = message.guild.channels.find("name", lvlChannel)
   
   if(!channel) {
     Quick.delete(`levelingChannel_${message.guild.id}`);
     lvlChan = `\`${prefix}settings lvl-log <channelName>\` **-** By default it is posted in the asme channel as the users message `;
   };
    lvlChan = `Level Log: \`${channel.name}\` To remove: \`${prefix}settings lvl-log delete\``
    
  };
  
  if(!args[0]) {
    let errorEmbed = new Discord.RichEmbed()
    .setColor(Bumper.Color)
    .setTitle("Bumper Settings")
    .addField("Welcome Log", `${logg}`)
    .addField("Welcome Message", `${msgg}`)
    .addField("Welcome Image", `${imgg}`)
    .addField("Prefix", `${pre}`)
    .addField("Leveling", `${lvl}`)
    .addField("Reminders", `${remind}`)
    .addField("Leveling Channel", `${lvlChan}`)
    .addField("Audit-Log", `${aud}`)
    .addField("Mod-Log", `${mod}`)
   
   return message.channel.send(errorEmbed);
  };
  
   if(args[0]) {
  
  if (Bumper.Developers.includes(message.author.id)) { } else {
    
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:konah:456305427236257804> **| You don't have `ADMINISTRATOR` perms.**");
    };
  };
  
  if(args[0] === "log") {
    
    let channelName = args[1];
    if(!channelName)return message.channel.send(`Please give a channel name.\n Ex: \`welcome-log\``);
    
    if(channelName === "delete") {
      Quick.delete(`welcomeLog_${message.guild.id}`);
      return message.channel.send(`Welcome log has been reset. `);
    };
    
    let channel = message.guild.channels.find("name", channelName);
    if(!channel)return message.channel.send(`Channel Name: \`${channelName}\` Was not found in this server.`);
    
    Quick.set(`welcomeLog_${message.guild.id}`, channel.name);
    message.channel.send(`Setting welcome-log to \`${channel.name}\`. `);
    
  };
  
    if(args[0] === "remind") {
    
    let channelName = args[1];
    if(!channelName)return message.channel.send(`Please give a channel name.\n Ex: \`reminder-log\``);
    
    if(channelName === "delete") {
      Quick.delete(`reminderLog_${message.guild.id}`);
      return message.channel.send(`Reminder Log has been reset. `);
    };
    
    let channel = message.guild.channels.find("name", channelName);
    if(!channel)return message.channel.send(`Channel Name: \`${channelName}\` Was not found in this server.`);
    
    Quick.set(`reminderLog_${message.guild.id}`, channel.name);
    message.channel.send(`Setting reminder log to \`${channel.name}\`. `);
    
  };
  
    if(args[0] === "lvl-log") {
    
    let channelName = args[1];
    if(!channelName)return message.channel.send(`Please give a channel name.\n Ex: \`leveling-log\``);
    
    if(channelName === "delete") {
      Quick.delete(`levelingChannel_${message.guild.id}`);
      return message.channel.send(`lvl-log has been reset. `);
    };
    
    let channel = message.guild.channels.find("name", channelName);
    if(!channel)return message.channel.send(`Channel Name: \`${channelName}\` Was not found in this server.`);
    
    Quick.set(`levelingChannel_${message.guild.id}`, channel.name);
    message.channel.send(`Setting lvl-log to \`${channel.name}\`. `);
    
  };
  
  if(args[0] === "msg") {
    
    let msg = args.slice(1).join(' ');
    if(!msg)return message.channel.send(`Please give a welcome msg.`);
    
    if(msg === "delete") {
      Quick.delete(`welcomeMSG_${message.guild.id}`);
      return message.channel.send(`Welcome message has been reset.`);
    };
    
    Quick.set(`welcomeMSG_${message.guild.id}`, msg);
    message.channel.send(`Setting welcome-msg to \`${msg}\`.`)
    
  };
  
  if(args[0] === "img") { 
    
    let url = args[1];
    if(!url)return message.channel.send(`Please give a picture url.`);
    
    if(url === "delete") {
      Quick.delete(`welcomeIMG_${message.guild.id}`);
      message.channel.send(`Welcome Image has been reset.`);
    };
    
    Quick.set(`welcomeIMG_${message.guild.id}`, url);
    message.channel.send(`Setting Welcome Image to ${url} .`);
   // Bumper.channel.get("554023020973522946").send(`${message.guild.name} want to set there welcome image to: ${url} .`);
    
  };
  
  if(args[0] === "audit") {
   
    let channelName = args.slice(1).join(' ');
    if(!channelName)return message.channel.send(`Please give a channel name.`);
    
    if(channelName === "delete") {
      Quick.delete(`auditLog_${message.guild.id}`);
      return message.channel.send(`Audit-Log has been reset. `);
    };
    
    let channel = message.guild.channels.find("name", channelName);
    if(!channel)return message.channel.send(`Channel Name: \`${channelName}\` Was not found in this server.`);
    
    Quick.set(`auditLog_${message.guild.id}`, channel.name);
    message.channel.send(`Setting Audit-Log to \`${channel.name}\`.`);
  };
  
    if(args[0] === "mod") {
      
    let channelName = args.slice(1).join(' ');
    if(!channelName)return message.channel.send(`Please give a channel name.`);
    
    if(channelName === "delete") {
      Quick.delete(`auditLog_${message.guild.id}`);
      return message.channel.send(`Mod-Log has been reset. `);
    };
    
    let channel = message.guild.channels.find("name", channelName);
    if(!channel)return message.channel.send(`Channel Name: \`${channelName}\` Was not found in this server.`);
    
    Quick.set(`modLog_${message.guild.id}`, channel.name);
    message.channel.send(`Setting Mod-Log to \`${channel.name}\`.\n**Please make sure i send messages there**`);
  };
  
  if(args[0] === "prefix") { 
     
   let pref = args[1]
   if(!pref)return message.channel.send(`Please give a prefix.`);
    
   if(pref === "delete") {
    Quick.delete(`prefix_${message.guild.id}`);
    return message.channel.send(`Reset Prefix to \`b!!\``);
   };
    
   Quick.set(`prefix_${message.guild.id}`, pref);
   message.channel.send(`Settings Prefix to \`${pref}\``);
    
  };
  
  if(args[0] === "lvl") {
     
    let option = args[1];
    if(!option)return message.channel.send(`Please do \`${prefix}settings lvl [Disable / Enable]\`.`);
    
    if(option === "disable") {
      Quick.delete(`leveling_${message.guild.id}`);
      return message.channel.send(`Disabled Leveling for your server.`);
    };
    
    Quick.set(`leveling_${message.guild.id}`, 122);
    return message.channel.send(`Leveling is now Enabled.`);
  };
  

  
};

exports.help = {
  name: "settings",
  description: "Setup your server",
  usage: "b!settings"
};

exports.conf = {
  Aliases: [ "s" ] // No Aliases.
};