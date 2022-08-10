const slice = require('lodash/slice');
const nth = require('lodash/nth');
const riot = require('../commands/riot');
require('dotenv').config();
const authPrefix = process.env.AUTH_PREFIX;

module.exports = {
    handleMessage: (msg) => {
        if (msg.content.charAt(0) !== authPrefix) return;
        let path = msg.content.slice(1)
        path = path.split(' ');
        path = nth(path);
        console.log('path', path);
        const content = msg.content.slice(path.length + 1);
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