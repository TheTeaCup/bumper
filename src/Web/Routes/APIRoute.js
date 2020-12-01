const Router = require('express').Router();
const passport = require('passport');
let Developers = [ '338192747754160138', '488659939170975744' ];
const Bumper = require('../../Bot/BumperClient.js');
const Quick = require("quick.db")

/** 
  * Main API route
  */

Router.get('/callback', passport.authenticate('discord', { failureRedirect: '/404' }), (req, res) => {
  //console.log(`Testing: ` + req.query.state);
   if (Developers.includes(req.user.id)) { 
    req.session.isAdmin = true; 
  } else { 
    req.session.isAdmin = false; 
  };
    res.redirect(req.query.state);
});

Router.get('/undefined', (req, res) => { res.redirect('/me')
});

Router.get('/BV2/:ID', (req, res) => {
   
 if(req.query.key){ 
  if(req.query.key === "12225706Bcswan12"){
  
    let guild = Bumper.guilds.get(req.params.ID);
    if(!guild)return console.log("Server not found");
  
    Quick.add(`bumps_${guild.id}`, 5);
    console.log(`[Bumper V2] Upvoted ${guild.name} (${guild.id})`)
    res.send("Updated server");
    
   };
  };
});

Router.get('/s/:ID/recent-remove', (req, res) => {
  
    let guild = Bumper.guilds.get(req.params.ID);
    if(!guild)return console.log("Server not found");
    Bumper.recent.remove("recent", guild.id);
    res.redirect("/bumped")
  
});

module.exports = Router;