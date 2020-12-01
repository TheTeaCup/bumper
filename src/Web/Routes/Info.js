const Router = require('express').Router();
const Bumper = require('../../Bot/BumperClient.js');
const Quick = require("quick.db");
const ms = require('parse-ms');
const showdown = require('showdown');

Router.get('/:ID', async(req, res) => {
  
   let ID = req.params.ID
   if(!ID)return res.redirect("/404");
  
   let Guild = ""//Bumper.guilds.get(ID);
  // if(!Guild)return res.redirect("/404");
  
   let Users = [];
   Users.push("338192747754160138")
  // Users.push(Guild.owner.id)
  
   let Hidden = [];
   let Hide = Bumper.hidden.get("hide");
   Hide.map(Kiro => Hidden.push(Kiro));
  
   if(Hidden.includes(ID)) { if(req.user){ if(!Users.includes(req.user.id)) { return res.redirect("/?q=hidden")} } else {
     return res.redirect("/?q=hidden");
   }; 
};
  
   let Page = "Info";
   let Query = req.query.q;
   let Status = "Normal";
   let timeObj;
   let UpV = null;
   let min = req.query.m;

   if(Query === "UPV") { UpV = "123" }
   if(Query === "gw2") { UpV = "425" } 
  
   let premium = Bumper.officalServers.get("Offical");
   let Data = [];
   premium.map(Kiro => { Data.push(Kiro); });
  
   let payed = Bumper.Payed.get("payed");
   let Payed = [];
   payed.map(Kiro => { Payed.push(Kiro) });
  
   if(Data.includes(ID)) { Status = "Verified" };
   if(Payed.includes(ID)) { Status = "Official" };
  
   let LastBump = await Quick.fetch(`lastBump_${ID}`);
   if(LastBump === null) { timeObj = "n/a" } else { timeObj = ms(Date.now() - LastBump); }
   //console.log(timeObj)
   
   let Desc = await Quick.fetch(`description_${ID}`);
   let Invite = await Quick.fetch(`invite_${ID}`);
   let Option;
   if(!Invite) { Option = "disabled" };
  
   let Tags = await Quick.fetch(`tags.${ID}`);
   if(!Tags) { Tags = []; };
  
   var converter = new showdown.Converter({ strikethrough: true, simplifiedAutoLink: true, tables: true, underline: true, tasklists: true
    }),
   html = converter.makeHtml(Desc);
  
   let bumps = await Quick.fetch(`bumps_${ID}`);
   if(!bumps) { bumps = 0 };
  
   
  res.render(process.cwd() + '/src/Web/Views/server.ejs', { user:req.isAuthenticated() ? req.user : null, Bumper, Page, Guild, Status, timeObj, Desc, Tags, Option, UpV, min, Users, Hidden, html, bumps });
});

Router.get('/:ID/edit', checkAuth, async(req, res) => {
  
   let ID = req.params.ID
   if(!ID)return res.redirect("/404");
  
   let Guild = Bumper.guilds.get(ID);
   if(!Guild)return res.redirect("/404");
  
   let Users = [];
   Users.push("338192747754160138")
   Users.push(Guild.owner.id)
   let Page = "Edit";
   let Desc = await Quick.fetch(`description_${Guild.id}`);
   let Invite = await Quick.fetch(`invite_${Guild.id}`);
   let ShortDesc = Bumper.desc.get(Guild.id, 'desc');
  
   let premium = Bumper.officalServers.get("Offical");
   let Data = [];
   premium.map(Kiro => { Data.push(Kiro); });
  
   let Tags = await Quick.fetch(`tags.${Guild.id}`);
       let slotOne;
       let slotTwo;
       let slotThree;
       let slotFour;
       let slotFive;
       
      if(Tags) {
        slotOne = Tags[0];
        slotTwo = Tags[1];
        slotThree = Tags[2];
        slotFour = Tags[3];
        slotFive = Tags[4];
      };
   
  
  res.render(process.cwd() + '/src/Web/Views/edit.ejs', { user:req.isAuthenticated() ? req.user : null, Bumper, Page, Guild, Desc, Tags, ShortDesc, Invite, slotOne, slotTwo, slotThree, slotFour, slotFive });
});

Router.post('/:ID/edit', async(req, res) => {
  
   let ID = req.params.ID
   if(!ID)return res.redirect("/404");
  
   let Guild = Bumper.guilds.get(ID);
   if(!Guild)return res.redirect("/404");
  
   //console.log(req.body);
   let data = req.body;
  
   let Tags = await Quick.fetch(`tags.${Guild.id}`);
   
   if(data.tag1) { Quick.push(`tags.${Guild.id}`, data.tag1); }
   if(data.tag2) { Quick.push(`tags.${Guild.id}`, data.tag2); }
   if(data.tag3) { Quick.push(`tags.${Guild.id}`, data.tag3); }
   if(data.tag4) { Quick.push(`tags.${Guild.id}`, data.tag4); }
   if(data.tag5) { Quick.push(`tags.${Guild.id}`, data.tag5); }
  
   Quick.set(`description_${Guild.id}`, data.fulldesc);
   Bumper.desc.set(Guild.id, data.desc,'desc');
  
   res.redirect("/info/" + Guild.id);
     
   
});

Router.get('/:ID/invite', async(req, res) => {
  
   let ID = req.params.ID
   if(!ID)return res.redirect("/404");
   let Option = "enabled"
   let Guild = Bumper.guilds.get(ID);
   if(!Guild)return res.redirect("/404");
  
   let Invite = await Quick.fetch(`invite_${Guild.id}`);
   if(!Invite)return res.redirect("/info/" + Guild.id + "?q=NO_INV");
  
   res.redirect(`https://discord.gg/${Invite}`)
  
});

Router.get('/:ID/bump', async(req, res) => {
  
   let ID = req.params.ID
   if(!ID)return res.redirect("/404");
   let Option = "enabled"
   let Guild = Bumper.guilds.get(ID);
   if(!Guild)return res.redirect("/404");
  
   let lastDaily = await Quick.fetch(`lastDaily_${Guild.id}`);
   let cooldown = 1.08e+7;
  
   if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
      
      let timeObj = ms(cooldown - (Date.now() - lastDaily));
      res.redirect(`/info/${Guild.id}?h=${timeObj.hours}&m=${timeObj.minutes}`)
      
      } else {
        
      Quick.set(`lastDaily_${Guild.id}`, Date.now());
      Quick.set(`lastBump_${Guild.id}`, Date.now());
      Quick.add(`bumps_${Guild.id}`, 1);
      Bumper.recent.push("recent", Guild.id);
      res.redirect(`/info/${Guild.id}?q=UPV`)
        
    };
});

Router.get('/:ID/verify', async(req, res) => {
  
   let ID = req.params.ID
   if(!ID)return res.redirect("/404");
   let Option = "enabled"
   let Guild = Bumper.guilds.get(ID);
   if(!Guild)return res.redirect("/404");
  
   Bumper.officalServers.push("Offical", Guild.id);
   res.redirect(`/info/${Guild.id}?q=now_verifed`)
  
});

Router.get('/:ID/official', async(req, res) => {
  
   let ID = req.params.ID
   if(!ID)return res.redirect("/404");
   let Option = "enabled"
   let Guild = Bumper.guilds.get(ID);
   if(!Guild)return res.redirect("/404");
  
   Bumper.Payed.push("payed", Guild.id);
   res.redirect(`/info/${Guild.id}?q=now_official`)
  
});

Router.get('/:ID/hide', async(req, res) => {
  
   let ID = req.params.ID
   if(!ID)return res.redirect("/404");
   let Option = "enabled"
   let Guild = Bumper.guilds.get(ID);
   if(!Guild)return res.redirect("/404");
  
   Bumper.hidden.push("hide", Guild.id);
   res.redirect(`/info/${Guild.id}?q=now_hidden`);
   Bumper.channels.get("479797347702800399").send(`**<@${req.user.id}> Just hide, ${Guild.name}**`);
  
});

Router.get('/:ID/un-hide', async(req, res) => {
  
   let ID = req.params.ID
   if(!ID)return res.redirect("/404");
   let Option = "enabled"
   let Guild = Bumper.guilds.get(ID);
   if(!Guild)return res.redirect("/404");
  
   Bumper.hidden.remove("hide", Guild.id);
   res.redirect(`/info/${Guild.id}?q=no_longer_hidden`);
   Bumper.channels.get("479797347702800399").send(`**<@${req.user.id}> Just un-hide, ${Guild.name}**`);
   
});

module.exports = Router;

/*
 * Authorization check, if not authorized return them to the login page.
 */
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  } else {
    req.session.backURL = req.url

    res.redirect('/login?redirect=' + req.url);
  }
};