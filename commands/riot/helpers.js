const get = require('lodash/get');
const forEach = require('lodash/forEach');
const set = require('lodash/set');
const isEmpty = require('lodash/isEmpty');
const map = require('lodash/map');
const concat = require('lodash/concat');
const { getAllChamps } = require('./api');
const { EmbedBuilder } = require('discord.js');

let champCache = {};
let organizedChamps = {};

const buildEmbedChamp = (champion) => {
    return new EmbedBuilder()
}

const mapChamps = (champions) => {
    return map(champions, (champ) => {
        return {
            id: get(champ, 'id', ''),
            image: get(champ, 'image', {}),
            name: get(champ, 'name', ''),
            key: get(champ, 'key', ''),
            tags: get(champ, 'tags', []),
        };
    });
};

const organizeChamps = (champions, organize) => {
    const mappedChamps = mapChamps(champions);
    champCache = mappedChamps;
    forEach(champions, (champ) => {
        const tags = get(champ, 'tags', []);
        const champMapped = {
            id: get(champ, 'id', ''),
            image: get(champ, 'image', {}),
            name: get(champ, 'name', ''),
            key: get(champ, 'key', ''),
            tags,
        };
        forEach(tags, (tag) => {
            set(organizedChamps, tag.toLowerCase(), concat(get(organizedChamps, [tag.toLowerCase()], []), champMapped))
        });
    });
    return organize ? organizedChamps : champCache;
};

const getChamps = async (organize = false) => {
    if (organize) {
        return !isEmpty(organizedChamps) ? organizedChamps : organizeChamps(await getAllChamps(), organize);
    } else {
        return !isEmpty(champCache) ? champCache : organizeChamps(await getAllChamps(), organize);
    };
}

module.exports = {
    getChamps,
    organizeChamps,
};