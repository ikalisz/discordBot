const get = require('lodash/get');
const forEach = require('lodash/forEach');
const set = require('lodash/set');
const isEmpty = require('lodash/isEmpty');
const map = require('lodash/map');
const concat = require('lodash/concat');
const cloneDeep = require('lodash/cloneDeep');
const { getAllChamps, getChampSquareAssetLink } = require('./api');
const { EmbedBuilder } = require('discord.js');

let champCache = {};
let organizedChamps = {};

const buildEmbedChamp = (champion) => {
    // const champEmbed = new EmbedBuilder()
    //     .setTitle('Title')
    //     .setImage(get(champion, 'image'))
    //     .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    //     .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
    //     .setThumbnail(get(champion, 'image'))
    //     .setDescription('Some description here');

    // return champEmbed

    const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return exampleEmbed
}

const mapChamps = (champions) => {
    return map(champions, (champ) => {
        const image = getChampSquareAssetLink(champ)
        return {
            id: get(champ, 'id', ''),
            image,
            name: get(champ, 'name', ''),
            key: get(champ, 'key', ''),
            tags: get(champ, 'tags', []),
        };
    });
};

const organizeChamps = (champions, organize) => {
    const mappedChamps = mapChamps(champions);
    champCache = cloneDeep(mappedChamps);
    forEach(mappedChamps, (champ) => {
        const tags = get(champ, 'tags', []);
        forEach(tags, (tag) => {
            set(organizedChamps, tag.toLowerCase(), concat(get(organizedChamps, [tag.toLowerCase()], []), champ))
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
    buildEmbedChamp,
};