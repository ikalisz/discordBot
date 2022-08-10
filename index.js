const { Client, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const express = require('express')
const app = express()
const paths = require('./paths');
const moment = require('moment');
require('dotenv').config();

const authPrefix = process.env.AUTH_PREFIX;
const champCache = {};
const lastCmdRunTime = moment();

app.use(express.json())

bot.once('ready', () => {
    console.info('Working now!');
    bot.user.setStatus('Ready to work!');
})

bot.once('guildMemberAdd', member => {

})

bot.on('messageCreate', (msg) => {
    console.log('here!');
    const { name } = msg.channel.guild;
    if (!msg.author.bot) {
        paths.handleMessage(msg);
        if (msg.content === '!duck') {
            msg.channel.send('https://images-na.ssl-images-amazon.com/images/I/8166xCVDGnL._SY355_.jpg')
        }
    }
})


bot.login(process.env.BOT_TOKEN);