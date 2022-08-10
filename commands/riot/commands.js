const isEmpty = require('lodash/isEmpty');
const nth = require('lodash/nth');
const slice = require('lodash/slice');
const isNull = require('lodash/isNull');
const includes = require('lodash/includes');
const find = require('lodash/find');
const get = require('lodash/get');
const trim = require('lodash/trim');
const map = require('lodash/map');
const concat = require('lodash/concat');
const groupBy = require('lodash/groupBy');
const isUndefined = require('lodash/isUndefined');
const helpers = require('./helpers');


let teamChamps = [];

const teamCompOptions = ['Tank', 'Fighter', 'Marksman', 'Support', 'Mage', 'Assassin', 'Random'];
const overlapOptions = ['yes', 'no']

const pickChamp =  async (champions, teamSize, teamComp = ['Random'], overlap = false, whichTeam = 1, teamChamps) => {
    // TODO: Make it so we support Tank/Fighter This would be done by checking the length of teamComp.split('/')
    let [teamCompSelection, ...teamCompOptions] = teamComp;
    let pickedChampion = {};
    if (isUndefined(teamCompSelection)) {
        teamCompSelection = 'Random'
    }
    const selectedChampions = teamCompSelection === 'Random' ?  await helpers.getChamps(false) : get(champions, [teamCompSelection.toLowerCase()]);
    const champIndex = Math.floor(Math.random() * selectedChampions.length);
    pickedChampion = selectedChampions[champIndex];

    if ((overlap && checkChampOverlap(pickedChampion, teamChamps)) || !isEmpty(get(find(teamComp, ['id', get(pickedChampion, 'id')]), 'team' === `team${whichTeam}`))) {
        return pickChamp(champions, teamSize, teamComp, overlap, whichTeam, teamChamps);
    } else if (teamChamps.length === (teamSize * 2 - 1)) {
        return concat(teamChamps, { ...pickedChampion, team: `team${whichTeam}`, tag: teamCompSelection })
    } else {
        return whichTeam === 2 ?
            pickChamp(champions, teamSize, teamCompOptions, overlap, whichTeam === 1 ? 2 : 1, concat(teamChamps, { ...pickedChampion, team: `team${whichTeam}`, tag: teamCompSelection })) :
            pickChamp(champions, teamSize, teamComp, overlap, whichTeam === 1 ? 2 : 1, concat(teamChamps, { ...pickedChampion, team: `team${whichTeam}`, tag: teamCompSelection  }))
    }
};

const checkChampOverlap = (champ, teamChamps) => {
    return !isUndefined(find(teamChamps, ['id', get(champ, 'id')]));
}

module.exports = {
    customRandomizer: async (msg, content) => {
        // Should take in 3 params (Team size, team comp (optional), overlap (optional))
        // Params will come in the message as ~custom 4 - TANK, SUPPORT, MARKSMAN - yes
        if (!isEmpty(teamChamps)) teamChamps = [];
        const params = content.split('-');
        const teamSize = parseInt(nth(params));
        if (isNull(teamSize)) msg.reply('You need to include the size of teams!');
        const overlap = trim(nth(params, -1));
        let teamComp = map((includes(overlapOptions, overlap.toLowerCase()) ? nth(slice(params, 1, -1)).split(',') : nth(slice(params, 1)).split(',')), (item) => trim(item));
        
        if (!isEmpty(find(teamComp, (selection) => !includes(teamCompOptions, selection)))) {
            return msg.reply(`You included an invalid option for team comp! The available options are: ${teamCompOptions.join(', ')}`)
        };
        const pickedChamps = groupBy(await pickChamp(await helpers.getChamps(true), teamSize, teamComp, overlap, 1, teamChamps), 'team');

        const team1 = map(get(pickedChamps, 'team1', []), (champ) => `${champ.name} (${get(champ, 'tag')})`);
        const team2 = map(get(pickedChamps, 'team2', []), (champ) => `${champ.name} (${get(champ, 'tag')})`);

        const team1Embeds = map(get(pickedChamps, 'team1', []), (champ) => helpers.buildEmbedChamp(champ));
        const team2Embeds = map(get(pickedChamps, 'team2', []), (champ) => helpers.buildEmbedChamp(champ));

        msg.channel.send(`Team 1 has champs: ${team1.join(', ')}`);
        msg.channel.send({ embeds: team1Embeds });
        msg.channel.send(`Team 2 has champs: ${team2.join(', ')}`);
        msg.channel.send({ embeds: team2Embeds });
    },
    summonerLookup: (msg) => {

    }
}