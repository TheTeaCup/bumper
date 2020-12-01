const Discord = require("discord.js");
const Quick = require("quick.db");
var converter = require('hex2dec');
const { registerFont, createCanvas, loadImage } = require('canvas')
const hexRgb = require('hex-rgb');


exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  
      if(!args[0])message.channel.send("Please give a hexcode \`#fff`");
      var hex = args[0].replace("#","");
      if(hex.length != 6)return message.channel.send("Must be 6-digit hexadecimal color code");
      var analize = function(st){
        var dec = converter.hexToDec('0x'+st);
        return dec;
      }
      var one = analize(hex);
      var calc = function(r,g,b){
        var output = (r*65536)+(g*256)+b
        return output;
      }
      var result = one;
      var pe = hexRgb(hex);
      const canvas = createCanvas(200, 200)
      const ctx = canvas.getContext('2d')
      ctx.beginPath();
      ctx.rect(20, 20, 200, 200);
      ctx.fillStyle = args[0];
      ctx.fill();
      message.channel.send({
        "files": [new Discord.Attachment(canvas.toBuffer(), 'file.png')],
        "embed": {
          "color": result,
          "thumbnail": {
            "url": "attachment://file.png"
          },
          "author": {
            "name": args[0],
          },
          "fields": [
            {
              "name": "RGB",
              "value": pe.red+" "+pe.green+" "+pe.blue,
              "inline": true
            },
            {
              "name": "Decimal",
              "value": result,
              "inline": true
            }
          ]
        }
      })
  };

module.exports.help = {
  name: "color",
  description: "Shows Bumpers Commands.",
  usage: "b!Color"
}
exports.conf = {
  Aliases: [ ]
};