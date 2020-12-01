const Discord = require("discord.js");
const Quick = require("quick.db");

exports.run = async (Bumper, message, args) => {
  // eslint-disable-line no-unused-vars

  let PageEmbed = new Discord.RichEmbed()
    .setColor(Bumper.Color)
    .setTitle("Info Page")
    .setThumbnail(
      "https://cdn.glitch.com/0ce75f44-0720-4204-9b62-85f1028d9f7a%2FBumpBeta_yellow.png?v=1559845376082"
    )
    .setDescription(
      `Visit our website [Here](https://bumperbot.ml/info/${message.guild.id}) To view the servers page.`
    );
  message.channel.send(PageEmbed);
};

exports.help = {
  name: "page",
  description: "View the server online",
  usage: "b!page"
};

exports.conf = {
  Aliases: [] // No Aliases.
};
