const isEmpty = require('lodash/isEmpty');
const nth = require('lodash/nth');
const slice = require('lodash/slice');
const isNull = require('lodash/isNull');
const includes = require('lodash/includes');
const find = require('lodash/find');
const get = require('lodash/get');
const trim = require('lodash/trim');
const map = require('lodash/map');
const helpers = require('./helpers');


let team1 = [];
let team2 = [];

const teamCompOptions = ['Tank', 'Fighter', 'Marksman', 'Support', 'Mage', 'Assassin', 'Random'];
const overlapOptions = ['yes', 'no']

const pickChamp =  async (champions, index, teamComp = 'Random', overlap = false, whichTeam = 1) => {
    // TODO: Make it so we support Tank/Fighter This would be done by checking the length of teamComp.split('/')
    console.log('champions', teamComp, champions);
    let pickedChampion = {};
    const selectedChampions = teamComp !== 'Random' ? get(champions, [teamComp.toLowerCase()]) : await helpers.getChamps(false);
    console.log('selectedChampions', selectedChampions);
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
    customRandomizer: async (msg, content) => {
        // Should take in 3 params (Team size, team comp (optional), overlap (optional))
        // Params will come in the message as ~custom 4 - TANK, SUPPORT, MARKSMAN - yes
        console.log('content', content)
        const params = content.split('-');
        console.log('params', params);
        const teamSize = parseInt(nth(params));
        if (isNull(teamSize)) msg.reply('You need to include the size of teams!');
        const overlap = trim(nth(params, -1));
        let teamComp = map((includes(overlapOptions, overlap.toLowerCase()) ? nth(slice(params, 1, -1)).split(',') : nth(slice(params, 1)).split(',')), (item) => trim(item));
        console.log('teamComp before', teamComp, includes(overlapOptions, overlap.toLowerCase()), overlap.toLowerCase());
        
        if (!isEmpty(find(teamComp, (selection) => !includes(teamCompOptions, selection)))) {
            console.log('overlap', overlap);
            console.log('teamComp', teamComp);
            return msg.reply(`You included an invalid option for team comp! The available options are: ${teamCompOptions.join(', ')}`)
        };
        for (let i = 0; i < teamSize; i++) {
            await pickChamp(await helpers.getChamps(true) , i, get(teamComp, i), overlap, 1);
        }
    },
    summonerLookup: (msg) => {

    }
}