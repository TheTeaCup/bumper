const Discord = require("discord.js");
const Quick = require("quick.db");
exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!";
  
  let Color = Bumper.Color;
  
   if(!args[0]) {
   let errorEmbed = new Discord.RichEmbed()
   .setColor(Color)
   .addField("Add a Role", `\`${prefix}selfrole add <roleName>\``)
   .addField("Get a Role", `\`${prefix}selfrole get <roleName>\``)
   .addField("Self Role List", `\`${prefix}selfrole list\``)
   .addField("Remove a Role", `\`${prefix}selfrole remove <roleName>\``)
   .setTitle("Self Role")
   .setThumbnail(message.guild.iconURL)
   return message.channel.send(errorEmbed);
  };
  
    if(args[0] === "list") {
    if(Bumper.selfRole.has(message.guild.id)){
      let data = [];
        let roles = Bumper.selfRole.get(message.guild.id, "role")
          roles.map(async Kiro => {
          let info = message.guild.roles.find("name", Kiro);
          data.push(`\`Role Name:\` **${info.name}** | \`How To Get:\` **${prefix}selfrole get ${info.name}**`)
        });
      message.channel.send(data.join("\n"));  
    } else {
      message.channel.send("You have no self roles.");
    };
  };
  
  if(args[0] === "get") {
    let roles;
    let role = args.slice(1).join(' ');
    
    if(!role)return message.channel.send(`**Usage:** \`${prefix}selfrole get <roleName>\``);
    
    let roleName = message.guild.roles.find("name", role);
    if(!roleName)return message.channel.send(`The role \`${role}\` is invalid`);
    
    
    if(Bumper.selfRole.has(message.guild.id, "role", role)) {
      
       if (message.guild.members.get(message.author.id).roles.find("name", roleName.name)) {
        
         message.member.removeRole(roleName.id).catch(console.log) /*.then(send => {
            return message.channel.send("[Error] I can not remove the role to you.");
          }); */
         message.channel.send(`Removed you from \`${roleName.name}\``);
         
        } else {
        
          message.member.addRole(roleName.id).catch(console.log) /*.then(send => {
            return message.channel.send("[Error] I can not add the role to you.");
          }); */
          message.channel.send(`Added \`${roleName.name}\` to you`);
          
       };
     } else {
      message.channel.send(`The role \`${role}\` is not on my database.`);
    };
  };
  
  if(args[0]) {
  if(args[0] === "list")return;
  if(args[0] === "get")return;
  
  if (Bumper.Developers.includes(message.author.id)) {  } else {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:konah:456305427236257804> **| You don't have `ADMINISTRATOR` perms.**");
    };
  };
  
  if(args[0] === "add") {
    let role = args.slice(1).join(' ');
    if(!role)return message.channel.send(`Please give a role name.`);
    console.log(role);
    
    let roleYN = message.guild.roles.find("name", role)
    if(!roleYN)return message.channel.send(`The role you entered is incorrect.`)
    
    if(Bumper.selfRole.has(message.guild.id)){
      
    Bumper.selfRole.push(message.guild.id, role, "role")
      
    let settingEmebd = new Discord.RichEmbed()
    .setColor(Color)
    .setTitle("Self Role")
    .setDescription(`You have set your self role to \`${role}\``)
    message.channel.send(settingEmebd);
      
    
      
       } else {
    
    Bumper.selfRole.set(message.guild.id, [], "role")
    Bumper.selfRole.push(message.guild.id, role, "role")
         
    let settingEmbed = new Discord.RichEmbed()
    .setColor(Color)
    .setTitle("Self Role")
    .setDescription(`You have set your self role to ${role}`)
    .setFooter("Please make sure i'm above these roles.")
    message.channel.send(settingEmbed)
         
    };
  };
  
  if(args[0] === "remove") {
    let Data = [];
    let role = args.slice(1).join(' ');
    
    if(!role)return message.channel.send(`Please give a role name.`);
    console.log(role);
    
    let roleYN = message.guild.roles.find("name", role);
    if(!roleYN)return message.channel.send(`The role you entered is incorrect.`);
    
    let roles = Bumper.selfRole.get(message.guild.id, "role");
    console.log(roles);
    
    roles.map(Kiro => {
     Data.push(`${Kiro}`);
    });
    
      if(Data.includes(role)) { 
     return message.channel.send(`Command not done please alert my dev @Tea Cup#9999`);
      } else {
      return message.channel.send(`The role \`${role}\` was not found in my database.`);
    };
  };
  

};

exports.help = {
  name: "selfrole",
  description: "Gives The users bump stats.",
  usage: "b!SelfRole"
};

exports.conf = {
  Aliases: [ "self-role" ] // No Aliases.
};