const Discord = require("discord.js");
const db = require("quick.db");
module.exports = function(req, res, bot) {
  console.log(req.headers);
  console.log(req.headers.authorization);
  const slots = [
    "https://cdn.discordapp.com/attachments/443458255394701325/500448171130880010/unknown.png",
    "https://cdn.discordapp.com/attachments/443458255394701325/500448466711871508/unknown.png"
  ];

  const slotOne = slots[Math.floor(Math.random() * slots.length)];

  let user = req.body.user;
  if (bot.users.get(user)) {
    let embed = new Discord.RichEmbed()
      .setColor("BLURPLE")
      .setThumbnail(slotOne)
      .setTitle("Thank you for voting, " + bot.users.get(user).tag + "!")
      .setDescription(
        "More updates are coming and what you just did gives me more motivation!"
      );
    bot.users
      .get(user)
      .send(embed)
      .catch(err => {});
  }
};
