const slice = require('lodash/slice');
const nth = require('lodash/nth');
const riot = require('../customCommands/riot');
require('dotenv').config();
const authPrefix = process.env.AUTH_PREFIX;

module.exports = {
    handleMessage: async (interaction) => {
        // if (msg.content.charAt(0) !== authPrefix) return;
        const { commandName } = interaction;
        // let path = msg.content.slice(1)
        // path = path.split(' ');
        // path = nth(path);
        // const content = msg.content.slice(path.length + 1);
        switch (commandName) {
            case 'custom': 
                riot.commands.customRandomizer(interaction, content);
                break;
            case 'help':
                interaction.reply('You hit the help command');
                break;
            default:
                interaction.reply('That is not a valid command.');
                break;
        }
    },
    handleError: (err) => {

    }
}