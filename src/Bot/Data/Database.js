/* Database */
const enmap = require('enmap');
const enmapSQLite = require('enmap-sqlite');

module.exports = Bumper => {
  console.log("(Bot) Database Up!")
  
  Bumper.selfRole = new enmap({ name: "role" });
  Bumper.supporters = new enmap({ name: "supporter" });
  Bumper.invites = new enmap({ name: "invite" });
  Bumper.desc = new enmap({ name: "desc" });
  Bumper.officalServers = new enmap({ name: "Offical" });
  Bumper.publicServers = new enmap({ name: "public" });
  Bumper.hidden = new enmap({ name: "hide" });
  Bumper.Payed = new enmap({ name: "payed" });
  Bumper.Tags = new enmap({ name: "tags" });
  Bumper.recent = new enmap({ name: "recent" });
  
};