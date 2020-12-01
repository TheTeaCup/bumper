const Router = require('express').Router();

/**
  * CSS Files
  */
Router.get('/index.css', (req, res) => res.sendFile(process.cwd() + '/src/Web/Views/CSS/index.css'));
Router.get('/text-fonts.css', (req, res) => res.sendFile(process.cwd() + '/src/Web/Views/CSS/text-fonts.css'));
Router.get('/footer.css', (req, res) => res.sendFile(process.cwd() + '/src/Web/Views/CSS/footer.css'));
Router.get('/page.css', (req, res) => res.sendFile(process.cwd() + '/src/Web/Views/CSS/page.css'));

Router.get('/', (req, res) => res.send(`You're not allowed here! Support Server: https://discord.gg/NmNB7CK Back: <a href="h/"><div class=""><h1>Go Back</h1></div></a>`))

module.exports = Router;