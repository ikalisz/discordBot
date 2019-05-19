const Discord = require('discord.js')
const bot = new Discord.Client()
const auth = require('./auth.json')

bot.on('ready', () => {
    console.log('haha ezpz')
})

bot.login(auth.token)