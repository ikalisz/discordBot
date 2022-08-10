const { SlashCommandBuilder } = require('discord.js');

const teamCompOptions = ['Tank', 'Fighter', 'Marksman', 'Support', 'Mage', 'Assassin', 'Random'];

const custom = new SlashCommandBuilder()
    .setName('custom')
    .setDescription('Rolls champions for a custom')
    .addIntegerOption(option => option
        .setName('teamsize')
        .setDescription('The amount of players on each team.')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5))
    .addBooleanOption(option => option
        .setName('overlap')
        .setDescription('If you want a chance for a champion to be on both teams.'))
    .addStringOption(option => option
        .setName('teamcomp1')
        .setDescription('The preferred champ tag to roll in position 1')
        .addChoices(
            { name: 'Tank', value: 'Tank' },
            { name: 'Fighter', value: 'Fighter' },
            { name: 'Marksman', value: 'Marksman' },
            { name: 'Support', value: 'Support' },
            { name: 'Assassin', value: 'Assassin'},
            { name: 'Mage', value: 'Mage'},
            { name: 'Random', value: 'Random' },
        ))
    .addStringOption(option => option
        .setName('teamcomp2')
        .setDescription('The preferred champ tag to roll in position 2')
        .addChoices(
            { name: 'Tank', value: 'Tank' },
            { name: 'Fighter', value: 'Fighter' },
            { name: 'Marksman', value: 'Marksman' },
            { name: 'Support', value: 'Support' },
            { name: 'Assassin', value: 'Assassin'},
            { name: 'Mage', value: 'Mage'},
            { name: 'Random', value: 'Random' },
        ))
    .addStringOption(option => option
        .setName('teamcomp3')
        .setDescription('The preferred champ tag to roll in position 3')
        .addChoices(
            { name: 'Tank', value: 'Tank' },
            { name: 'Fighter', value: 'Fighter' },
            { name: 'Marksman', value: 'Marksman' },
            { name: 'Support', value: 'Support' },
            { name: 'Assassin', value: 'Assassin'},
            { name: 'Mage', value: 'Mage'},
            { name: 'Random', value: 'Random' },
        ))
    .addStringOption(option => option
        .setName('teamcomp4')
        .setDescription('The preferred champ tag to roll in position 4')
        .addChoices(
            { name: 'Tank', value: 'Tank' },
            { name: 'Fighter', value: 'Fighter' },
            { name: 'Marksman', value: 'Marksman' },
            { name: 'Support', value: 'Support' },
            { name: 'Assassin', value: 'Assassin'},
            { name: 'Mage', value: 'Mage'},
            { name: 'Random', value: 'Random' },
        ))
    .addStringOption(option => option
        .setName('teamcomp5')
        .setDescription('The preferred champ tag to roll in position 5')
        .addChoices(
            { name: 'Tank', value: 'Tank' },
            { name: 'Fighter', value: 'Fighter' },
            { name: 'Marksman', value: 'Marksman' },
            { name: 'Support', value: 'Support' },
            { name: 'Assassin', value: 'Assassin'},
            { name: 'Mage', value: 'Mage'},
            { name: 'Random', value: 'Random' },
        ))

const commands = [
    custom
];

module.exports = {
    commands
}
