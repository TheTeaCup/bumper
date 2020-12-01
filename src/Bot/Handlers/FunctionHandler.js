const Discord = require("discord.js");
const Quick = require("quick.db");

async function FunctionHandler(Bumper) {
  
   setInterval(async() => {
     
          let servers = Bumper.guilds.map(g=>g.id);
          const id = servers[Math.floor(Math.random() * Bumper.guilds.size)];
          let lastDaily = await Quick.fetch(`lastPartner_${id}`);
          let cooldown = "900000";
         
          try {
             if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
             console.log(`ID: ${id} Name: ${Bumper.guilds.get(id).name} Cooldown in place!`);
          } else {
             const discord = require("../PartnerAd.js")(Bumper, id);
            }; 
           } catch(err) {
          return console.log(err);
       };
    }, 30000); 
  
    setInterval(async() => {
            let pic = Bumper.users.get("453601455698608139")
            let servers = Bumper.guilds.map(g=>g.id);
            const id = servers[Math.floor(Math.random() * Bumper.guilds.size)];
            let auto = await Quick.fetch(`autoBump_${id}`);
        
            if(auto === "yes") {
         
            let lastDaily = await Quick.fetch(`lastBump_${id}`);
            let cooldown = "900000";
         
          try {
             if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
          } else {

            Quick.set(`lastBump_${id}`, Date.now());
            Quick.add(`bumps_${id}`, 2);
            Quick.add(`userBumps_552965127012614154_${id}`, 2) 
             
            }; 
           } catch(err) {
          return console.log(err);
        };
     };
  }, 60000);
  
};

module.exports = FunctionHandler;