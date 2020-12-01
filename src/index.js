const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const strategy = require('passport-discord').Strategy;
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const Quick = require("quick.db");
const app = express();
const MongoStore = require('connect-mongo')(session); 
var Server = require('http').createServer(app);
const Bumper = require('./Bot/BumperClient.js');

const MainRoute = require('./Web/Routes/MainRoute.js');
const APIRoute = require('./Web/Routes/APIRoute.js');
const CSSRoute = require('./Web/Routes/CSSRoute.js');
const JSRoute = require('./Web/Routes/JSRoute.js');
const MeRoute = require('./Web/Routes/MeRoute.js');
const ASRoute = require('./Web/Routes/Assets.js');
const InfoRoute = require('./Web/Routes/Info.js');

app.engine('html', require('ejs').renderFile);
app.all('*', checkHttps);

/* Login setup */
passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((obj, done) => { done(null, obj); });

passport.use(new strategy({
	clientID: '478730166680420373',
  clientSecret: '_lVqKRm0hBs3DSj3CEqgLtEZq8Uu8eII',
  callbackURL: 'https://bumperbot.ml/api/callback',
  scope: [ 'guilds', 'identify' ]
}, (accessToken, refreshToken, profile, done) => {
	process.nextTick(() => {
		return done(null, profile);
  });
}));

app.use(session({
   // store: new MongoStore({ url: '' }),
    secret: 'FROPT',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(helmet({ frameguard: false }));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser());

/**
  * Routes
  */
app.use('/', MainRoute);
app.use('/api', APIRoute);
app.use('/css', CSSRoute);
app.use('/js', JSRoute);
app.use('/assets', ASRoute);
app.use('/info', InfoRoute);
app.use('/me', MeRoute);


const votes = require('./Bot/UpVote.js');
app.post('/api/webhooks/dbl', (req, res) => { votes(req, res, Bumper); });

/* Get page status codes */
app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf('not found') ||
        ~err.message.indexOf('Cast to ObjectId failed'))
    ) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render(process.cwd() + "/src/Web/Views/422.ejs",{user:req.isAuthenticated() ? req.user : null, Website: "/login"})
      return;
    }

    // error page
    res.status(500).render(process.cwd() + "/src/Web/Views/500.ejs",{user:req.isAuthenticated() ? req.user : null, Website: req.originalUrl})
});

  // assume 404 since no middleware responded
app.use(function(req, res) {
  
    const payload = {
      url: req.originalUrl,
      main : `/`,
      BUM: `Bumper`,
      error: 'Not found'
    };
    res.status(404).render(process.cwd() + '/src/Web/Views/404.ejs', { Bumper, user: req.isAuthenticated() ? req.user : null, issue: payload.error, Website: payload.main });

});

/**
  * Let our application listen to a specific port and connect to Discord.
  */
const Listener = Server.listen(process.env.PORT, () => {
  console.log(`[ MBL ] Application is listening on port: ${Listener.address().port}.`);
});


Bumper.login(process.env.TOKEN).catch((err) => {
    console.log(`[ Bumper (Bot) ] Found an error while connecting to Discord.\n${err.stack}`);
});

/**
  * Extra functions.
  */
function checkHttps(req, res, next){
  if (req.get('X-Forwarded-Proto').indexOf('https') != -1) {
    return next();
  } else {
    res.redirect('https://' + req.hostname + req.url);
  };
};