const Discord = require("discord.js");

module.exports.run = async (Bumper, message, args) => { // eslint-disable-line no-unused-vars
  if (!Bumper.Developers.includes(message.author.id)) return message.channel.send(`You cant use this!`);
    
  function clean(text){
    if (typeof(text) === "string"){
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
      return text;
    };
  };
  
  if (!args[0]){
    return message.channel.send("Please provide code to \`Evaluate\`.").then(Kiro => Kiro.delete(5000));
  };
  
  const Code = args.join(" ");
  try{
    let Evaled = eval(Code);
    
    if (typeof Evaled !== "string");
    Evaled = require("util").inspect(Evaled);
    
    const EvalEmbed = new Discord.RichEmbed()
    .setTitle("**Evaluation**")
    .setColor(Bumper.Color)
    .addField("**Input**", `\`\`\`js\n${Code}\n\`\`\``)
    .addField("**Output**", `\`\`\`js\n${clean(Evaled).replace(Bumper.token, "Bumper!.")}\n\`\`\``)
    .setFooter(`Evaluated by ${message.author.tag}.`)
  
    return message.channel.send(EvalEmbed);
  } catch (err){
    const ErrorEmbed = new Discord.RichEmbed()
    .setTitle("**Evaluation**")
    .setColor(Bumper.Error)
    .addField("**Input**", `\`\`\`js\n${Code}\n\`\`\``)
    .addField("**Output**", `\`\`\`js\n${clean(err)}\n\`\`\``)
    .setFooter(`Evaluated by ${message.author.tag}.`)
    
    return message.channel.send(ErrorEmbed);
  };
};

module.exports.help = {
  name: "eval",
  description: "Evaluates code.",
  usage: "b!Eval"
}
exports.conf = {
  Aliases: [ "evaluate" ]
};