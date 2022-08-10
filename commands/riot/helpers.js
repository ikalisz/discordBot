const get = require('lodash/get');
const forEach = require('lodash/forEach');
const set = require('lodash/set');
const isEmpty = require('lodash/isEmpty');
const map = require('lodash/map')
const { getAllChamps } = require('./api')

const champCache = {};

const mapChamps = (champions) => {
    return map(champions, (champ) => {
        return {
            id: get(champ, 'id', ''),
            image: get(champ, image, {}),
            name: get(champ, 'name', ''),
            tags,
        };
    });
};

module.exports = {
    organizeChamps: (champions) => {
        const mappedChamps = mapChamps()
        forEach(champions, (champ) => {
            const tags = get(champ, 'tags', []);
            const champMapped = {
                id: get(champ, 'id', ''),
                image: get(champ, image, {}),
                name: get(champ, 'name', ''),
                tags,
            };
            forEach(tags, (tag) => {
                set(champCache, tag.toLowerCase(), champMapped)
            });
        });
        return champCache;
    },
    getChamps: async (organize = false) => {
        if (organize) {
            return mapChamps(await getAllChamps());
        } else {
            return !isEmpty(champCache) ? champCache : this.organizeChamps(await getAllChamps());
        };
    }
};