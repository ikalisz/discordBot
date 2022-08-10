const slice = require('lodash/slice');
const authPrefix = process.env.AUTH_PREFIX;
const riot = require('../commands/riot/commands');

module.exports = {
    handleMessage: (msg) => {
        if (msg.content.charAt(0) !== authPrefix) return;
        const path = nth(slice(msg.content, 1).split(' '));
        const content = slice(msg.content, path.length + 1);
        switch (path) {
            case 'custom': 
                riot.commands.customRandomizer(msg, content);
                break;
            default:
                msg.reply('That is not a valid command.');
                break;
        }
    },
    handleError: (err) => {

    }
}