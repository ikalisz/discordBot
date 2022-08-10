const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config();
const { CLIENT_ID, BOT_TOKEN, GUILD_ID } = process.env;
const {commands} = require('./commandDefinitions');

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);
console.log('commands', commands);

rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands }
).then(() => console.log('Successfully registered application commands!')).catch(console.error);