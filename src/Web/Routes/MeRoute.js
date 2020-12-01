const Router = require('express').Router();
const Bumper = require('../../Bot/BumperClient.js');
const Quick = require("quick.db");
const ms = require('parse-ms');
const Discord = require("discord.js");

Router.get('/', checkAuth, async(req, res) => {
  
   let Page = "Home";
   let Query = req.query.q;
   const perms = Discord.EvaluatedPermissions;
   
  Bumper.fetchUser(req.user.id).then(user => { let avatar = user.displayAvatarURL.split('?')[0]
   res.render(process.cwd() + '/src/Web/Views/me.ejs', { user:req.isAuthenticated() ? req.user : null, Bumper, Page, avatar, perms });                                              
  });
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
