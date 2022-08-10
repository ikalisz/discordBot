const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config();
const { CLIENT_ID, BOT_TOKEN } = process.env

const commands = [
    new SlashCommandBuilder().setName('custom').setDescription('Rolls champions for a custom'),
    new SlashCommandBuilder().setName('help').setDescription('Replies to the user with command help')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

rest.put(
    Routes.applicationGuildCommands(clientId), { body: commands }
).then(() => console.log('Successfully registered application commands!')).catch(console.error);