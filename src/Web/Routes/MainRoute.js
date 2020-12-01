const Router = require('express').Router();
const Bumper = require('../../Bot/BumperClient.js');
const showdown = require('showdown');
const Quick = require("quick.db");

/** 
  * Main page
  */
Router.get('/', async(req, res) => {
  
   let Page = "Home";
   let Query = req.query.q
   let Message = null;
   let MessageDefined = null;
   if(Query === "SUCCESSFULY_LOGGEDOUT") { Message = "You are now logged out.", MessageDefined = 1; };
   if(Query === "SENT_FEEDBACK") { Message = "Your FeedBack was submitted!", MessageDefined = 1; };
  
  let Data = [];
  var html;
  let give = null;
  let servers = Bumper.guilds.map(g=>g.id);
  
  let premium = Bumper.officalServers.get("Offical");
  let Pata = [];
//  premium.map(Kiro => { Pata.push(Kiro); });
  
  let payed = Bumper.Payed.get("payed");
  let Payed = [];
//  payed.map(Kiro => { Payed.push(Kiro) });
  
   let Hidden = [];
   let Hide = Bumper.hidden.get("hide");
//   Hide.map(Kiro => Hidden.push(Kiro));
  
  servers.map(async Kiro => {
    
    let Status;
    if(Hidden.includes(Kiro))return undefined; //Server is Hidden
    if(Pata.includes(Kiro)) { Status = "Verified" };
    if(Payed.includes(Kiro)) { Status = "Official" };
    
    let desc = Bumper.desc.get(Kiro, 'desc');
    if(!desc) { desc = "This server has not set their short description." };
    if(desc === "gg")return;
    
    let iccon;
    let icon = Bumper.guilds.get(Kiro).iconURL
    if(!icon)iccon = "https://i.imgur.com/2otMem9.png";
    if(icon)iccon = icon;
    
    let invite = Bumper.invites.get(Kiro);
    if(invite) {
      invite = invite.invite
    } else {
      invite = "gg";
    };
    if(desc === "") { desc = "**Owner needs to fix this**" }
   // console.log(Bumper.guilds.get(Kiro).name)
    var converter = new showdown.Converter({ strikethrough: true, simplifiedAutoLink: true, tables: true, underline: true, tasklists: true
    }),
    html = converter.makeHtml(desc);
    //console.log(desc)
    
    let Tags = []
    
    Data[Data.length] = {
      id: Kiro,
      name: `${Bumper.guilds.get(Kiro).name}`,
      members: `${Bumper.guilds.get(Kiro).memberCount}`,
      iconURL: `${iccon}`,
      online: `${Bumper.guilds.get(Kiro).members.filter(o => o.presence.status === "online").size}`,
      roles: `${Bumper.guilds.get(Kiro).roles.size}`,
      desc: `${html}`,
      invite: `${invite}`,
      tags: `${Tags}`,
      status: `${Status}`
    };
    
  });
   
  res.render(process.cwd() + '/src/Web/Views/index.ejs', { user:req.isAuthenticated() ? req.user : null, Bumper, Page, Message, MessageDefined, Data, Pata, html, Payed, give });
});

Router.get('/bumped', async(req, res) => {
  
  let Page = "Home";
  let Data = [];
  var html;
  let give = null;
  let servers = Bumper.recent.get("recent")
  
  let premium = Bumper.officalServers.get("Offical");
  let Pata = [];
  premium.map(Kiro => { Pata.push(Kiro); });
  
  let payed = Bumper.Payed.get("payed");
  let Payed = [];
  payed.map(Kiro => { Payed.push(Kiro) });
  
   let Hidden = [];
   let Hide = Bumper.hidden.get("hide");
   Hide.map(Kiro => Hidden.push(Kiro));
  
  servers.map(async Kiro => {
    
    let Status;
    if(Hidden.includes(Kiro))return undefined; //Server is Hidden
    if(Pata.includes(Kiro)) { Status = "Verified" };
    if(Payed.includes(Kiro)) { Status = "Official" };
    
    let desc = Bumper.desc.get(Kiro, 'desc');
    if(!desc) { desc = "This server has not set their short description." };
    if(desc === "gg")return;
    
    let iccon;
    let icon = ""
    if(!icon)iccon = "https://i.imgur.com/2otMem9.png";
    if(icon)iccon = icon;
    
    let invite = Bumper.invites.get(Kiro);
    if(invite) {
      invite = invite.invite
    } else {
      invite = "gg";
    };
    if(desc === "") { desc = "**Owner needs to fix this**" }
    var converter = new showdown.Converter({ strikethrough: true, simplifiedAutoLink: true, tables: true, underline: true, tasklists: true
    }),
    html = converter.makeHtml(desc);
    //console.log(html)
    
    let Tags = []
    
    Data[Data.length] = {
      id: Kiro,
      name: ``,//`${Bumper.guilds.get(Kiro).name}`,
      members: ``,//`${Bumper.guilds.get(Kiro).memberCount}`,
      iconURL: `${iccon}`,
      online: ``,//`${Bumper.guilds.get(Kiro).members.filter(o => o.presence.status === "online").size}`,
      roles: ``,//`${Bumper.guilds.get(Kiro).roles.size}`,
      desc: `${html}`,
      invite: `${invite}`,
      tags: `${Tags}`,
      status: `${Status}`
    };
    
  });
   
  res.render(process.cwd() + '/src/Web/Views/bumped.ejs', { user:req.isAuthenticated() ? req.user : null, Bumper, Page, Data, Pata, html, Payed, give });
});

Router.get('/login', (req, res) => {
  let redirect = req.query.redirect;
  if(!redirect) redirect = "/me";
  //console.log(redirect)
  res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=478730166680420373&redirect_uri=https%3A%2F%2Fbumperbot.ml%2Fapi%2Fcallback&response_type=code&scope=identify%20guilds&state=' + redirect);
});

Router.get('/logout', function(req, res) {
  req.session.destroy(() => {
    req.logout();
    res.redirect('/?q=SUCCESSFULY_LOGGEDOUT');
  });
});

Router.get('/discord', (req, res) => {
  res.redirect("https://discord.gg/fp4PMrT");
});

Router.get('/feedback', async(req, res) => {
   let Page = "Feedback";
   let ErrorMessage = null;
   let Error = req.query.error;
   if(Error === "not_msg") ErrorMessage = "no_message";
  res.render(process.cwd() + '/src/Web/Views/feedback.ejs', { user:req.isAuthenticated() ? req.user : null, Bumper, Page, ErrorMessage });
});

Router.post('/feedback/post/suggestion', checkAuth, async(req, res) => {
  if(req.body.suggestion) {
    Bumper.emit('suggestionSubmit', req);
    
    res.redirect('/?q=SENT_FEEDBACK');
  } else { 
    res.redirect('/feedback?error=not_msg');
  }
});

Router.post('/feedback/post/bug', checkAuth, async(req, res) => {
  if(req.body.bug) {
    Bumper.emit('suggestionBug', req);
    
    res.redirect('/?q=SENT_FEEDBACK');
  } else { 
    res.redirect('/feedback?error=not_msg') 
  }
});

Router.get('/admin', checkAuth, async(req, res) => {
   let Page = "Feedback";
   let user = req.isAuthenticated() ? req.user : null
   if(!user) return res.redirect("/")
   if(!Bumper.Developers.includes(user.id)) { res.redirect("/") }
  Bumper.fetchUser(req.user.id).then(user => { let avatar = user.displayAvatarURL.split('?')[0]
  res.render(process.cwd() + '/src/Web/Views/admin.ejs', { user:req.isAuthenticated() ? req.user : null, Bumper, Page, avatar});
                                             });
});

Router.get('/server/:ID', async(req, res) => {
   let ID = req.params.ID
   if(!ID)return res.redirect("/404");
  
   res.redirect("/info/" + ID);
  
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
