module.exports = async Bumper => {
  console.log("( Bot ) Connected to Discord.");

  Bumper.user.setPresence({ game: { name: `🌴 It's Summer time!`, type: 2 } });
  Bumper.user.setStatus("idle");

  //Dashboard Owner Sync
  Bumper.appInfo = await Bumper.fetchApplication();
  setInterval(async () => {
    Bumper.appInfo = await Bumper.fetchApplication();
  }, 60000);

  const MythicalAPI = require("mythical-api");
  let API = new MythicalAPI(
    "ltg38Uz7Y3nP8LYmtd7J5rt9Fy.8baY3PvwVxgIyV7.A9x6U3-"
  );
  API.postStats(Bumper.guilds.size, Bumper.user.id);

  // let info = await API.getBot(Bumper.user.id);
  // console.log(info)

  const wump = require("wumpfetch");
  const res = await wump(`https://yabl.xyz/api/bot/${Bumper.user.id}/stats`, {
    method: "POST",
    headers: { Authorization: process.env.YABL },
    data: { guildCount: Bumper.guilds.size }
  }).send();
};
