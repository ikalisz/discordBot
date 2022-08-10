const Discord = require('discord.js')
const bot = new Discord.Client()
const express = require('express')
const app = express()
const paths = require('./paths');
const moment = require('moment');
require('dotenv').config();

const authPrefix = process.env.AUTH_PREFIX;
const champCache = {};
const lastCmdRunTime = moment();

app.use(express.json())

bot.on('ready', () => {
    console.info('Working now!');
    bot.user.setStatus('Ready to work!');
})

bot.on('guildMemberAdd', member => {

})

bot.on('message', (msg) => {
    const { name } = msg.channel.guild;
    if (!msg.author.bot) {
        paths.handleMessage(msg);
        if (msg.content === '!duck') {
            msg.channel.send('https://images-na.ssl-images-amazon.com/images/I/8166xCVDGnL._SY355_.jpg')
        }
    }
})


bot.login(process.env.BOT_TOKEN);