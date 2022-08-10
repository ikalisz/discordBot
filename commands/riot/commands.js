const isEmpty = require('lodash/isEmpty');
const nth = require('lodash/nth');
const slice = require('lodash/slice');
const isNull = require('lodash/isNull');
const includes = require('lodash/includes');
const find = require('lodash/find');
const get = require('lodash/get');
const helpers = require('./helpers');


let team1 = [];
let team2 = [];

const teamCompOptions = ['Tank', 'Fighter', 'Marksman', 'Support', 'Mage', 'Assassin', 'Random'];
const overlapOptions = ['yes', 'no']

const pickChamp =  async (champions, index, teamComp = 'Random', overlap = false, whichTeam = 1) => {
    // TODO: Make it so we support Tank/Fighter This would be done by checking the length of teamComp.split('/')
    let pickedChampion = {};
    const selectedChampions = teamComp !== 'Random' ? get(champions, [teamComp.toLowerCase()]) : await helpers.getChamps(false);
    const champIndex = Math.floor(Math.random() * selectedChampions.length);
    pickedChampion = selectedChampions[champIndex];

    if ((overlap && checkChampOverlap(pickedChampion)) || !isEmpty(find((whichTeam === 1 ? team1 : team2), ['id', get(pickedChampion, 'id')]))) {
        pickChamp(champions, index, teamComp, overlap, whichTeam)
    } else {
        return whichTeam === 1 ? team1.push(pickedChampion) : team2.push(pickedChampion);
    }
};

const checkChampOverlap = (champ) => {
    return (isEmpty(find(team1, ['id', get(champ, 'id')])) || isEmpty(find(team2 ['id', get(champ, 'id')])));
}

module.exports = {
    customRandomizer: (msg, content) => {
        // Should take in 3 params (Team size, team comp (optional), overlap (optional))
        // Params will come in the message as ~custom 4 - TANK, SUPPORT, MARKSMAN - yes
        const params = content.split('-');
        const teamSize = parseInt(nth(params));
        if (isNull(teamSize)) msg.reply('You need to include the size of teams!');
        const overlap = nth(params, -1);
        const teamComp = includes(overlapOptions, overlap.toLowerCase()) ? slice(params, 1, -1) : slice(params, 1);
        
        if (!isEmpty(find(teamComp, (selection) => !includes(teamCompOptions, selection)))) {
            return msg.reply(`You included an invalid option for team comp! The available options are: ${teamCompOptions.join(', ')}`)
        };
        for (let i = 0; i < teamSize; i++) {
            pickChamp(champions, i, get(teamComp, i), overlap, 1);
        }
    },
    summonerLookup: (msg) => {

    }
}