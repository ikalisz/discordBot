const { commands: riot } = require('./riot');

const commands = [
    ...riot,
].map(command => command.toJSON());

module.exports = {
    commands,
}