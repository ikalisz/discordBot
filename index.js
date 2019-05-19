const Discord = require('discord.js')
const bot = new Discord.Client()
const express = require('express')
const app = express()
const axios = require('axios')
const auth = require('./auth.json')

app.use(express.json())

bot.on('ready', () => {
    console.log('haha ezpz')
})

bot.on('message', (msg) => {
    const { name } = msg.channel.guild
    if (!msg.author.bot) {
        if (msg.content === '!help' && msg.channel.name === 'ai-commands') {
            msg.reply('The commands are, !ping and !stream for now.')
        }
        if (msg.content === '!ping' && name === 'The Supercomputer') {
            if (msg.channel.name === 'ai-commands') {
                msg.reply('pong :ok_hand:')
            }
        } 
        if (msg.content === '!ping' && name !== 'The Supercomputer') {
            msg.reply('pong :ok_hand:')
        }
        if (msg.content === '!stream' && name === 'The Supercomputer') {
            axios.get('https://id.twitch.tv')
            .then(response => {
                console.log(response)
            })
            .catch (err => {
                console.log(err)
            })
            return msg.reply('This command is broken. Sorry!')
            axios.get('https://api.twitch.tv/helix', {headers: { Authorization: `Bearer `}})    
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
            }
    } 
})


console.log(bot)
bot.login(auth.token)