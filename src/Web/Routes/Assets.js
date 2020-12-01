const Express = require('express');
const Discord = require('discord.js');
const db = require('quick.db');

const Router = Express.Router();

Router.get('/discord.png', (req, res) => {
    res.redirect("https://cdn.discordapp.com/attachments/519247596884066305/569177908892139520/Adobe_Post_20190131_205512.png");
});

Router.get('/nav.png', (req, res) => {
    res.redirect("https://cdn.discordapp.com/avatars/584882748192456744/152b88d5a8e191b2dd66e458be203816.png?size=2048");
});

Router.get('/discord.svg', (req, res) => {
    res.redirect("https://cdn.glitch.com/8718b886-01f1-4358-806d-3ff3c0e187f1%2FDiscord-Logo-White.1c8a54f.svg?1555943430175");
});

Router.get('/Twitter_Logo.png', (req, res) => {
    res.redirect("https://cdn.glitch.com/8718b886-01f1-4358-806d-3ff3c0e187f1%2FTwitter_Logo_WhiteOnImage.d73d21c.png?1555943336140");
});

Router.get('/stats.svg', (req, res) => {
    res.redirect("https://cdn.glitch.com/8718b886-01f1-4358-806d-3ff3c0e187f1%2Fstatus.d652ec7.svg?1555944021226");
});

Router.get('/about.png', (req, res) => {
    res.redirect("https://cdn.glitch.com/8718b886-01f1-4358-806d-3ff3c0e187f1%2FTwitter_Logo_WhiteOnImage.d73d21c.png?1555943336140");
});

Router.get('/youtube.png', (req, res) => {
    res.redirect("https://cdn.discordapp.com/attachments/519247596884066305/570177766331383813/youtube.png");
});

Router.get('/twitch.png', (req, res) => {
    res.redirect("https://cdn.discordapp.com/attachments/519247596884066305/570177761767981066/twitch.png");
});

module.exports = Router;