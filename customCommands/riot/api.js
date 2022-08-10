const axios = require('axios');
const isEmpty = require('lodash/isEmpty');
const get = require('lodash/get');
const {
    dataDragonEndpoint,
} = require('./constants');
require('dotenv').config();
const RIOT_TOKEN = process.env.RIOT_TOKEN;

let cachedVersion = '';
const config = {
    headers: {
        Authorization: 'Bearer ' + RIOT_TOKEN
    }
}

const getDataDragonVersion = async () => {
    return get(await axios.get(`${dataDragonEndpoint}/api/versions.json`, config), 'data.0');
};

const getChampSquareAssetLink = async (champ) => {
    if (isEmpty(cachedVersion)) {
        const newVer = await getDataDragonVersion();
        cachedVersion = newVer;
        return `${dataDragonEndpoint}/cdn/${newVer}/img/champion/${get(champ, 'id')}.png`;
    } else {
        return `${dataDragonEndpoint}/cdn/${cachedVersion}/img/champion/${get(champ, 'id')}.png`;
    }
}

module.exports = {
    getAllChamps: async (version = cachedVersion) => {
        if (isEmpty(version)) {
            const newVer = await getDataDragonVersion();
            cachedVersion = newVer
            return get(await axios.get(`${dataDragonEndpoint}/cdn/${newVer}/data/en_US/champion.json`, config), 'data.data', []);
        } else {
            return get(await axios.get(`${dataDragonEndpoint}/cdn/${version}/data/en_US/champion.json`, config), 'data.data', []);
        }
    },
    getChampSquareAssetLink,
}