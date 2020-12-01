const Router = require('express').Router();

/**
  * JS Files
  */
Router.get('/instantclick.min.js', (req, res) => res.sendFile(process.cwd() + '/src/Web/Views/JS/instantclick.min.js'));
Router.get('/error.js', (req, res) => res.sendFile(process.cwd() + '/src/Web/Views/JS/error.js'));
Router.get('/Footer.js', (req, res) => res.sendFile(process.cwd() + '/src/Web/Views/JS/Footer.js'));
Router.get('/interactive_checkboxes.js', (req, res) => res.sendFile(process.cwd() + '/src/Web/Views/JS/check_boxes.js'));
Router.get('/darkmode.js', (req, res) => res.sendFile(process.cwd() + '/src/Web/Views/JS/darkmode.js'));

Router.get('/', (req, res) => res.send(`You're not allowed here! Support Server: https://discord.gg/NmNB7CK Back: <a href="https://beta.mythicalbots.xyz"><div class=""><h1>Go Back</h1></div></a>`))

module.exports = Router;