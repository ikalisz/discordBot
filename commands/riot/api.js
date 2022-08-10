const axios = require('axios');
const get = require('lodash/get');
const {
    dataDragonEndpoint,
} = require('./constants');
require('dotenv').config();
const RIOT_TOKEN = process.env.RIOT_TOKEN;

const getDataDragonVersion = async () => {
    return get(await axios.get(`${dataDragonEndpoint}/api/versions.json`, config), 'data.0');
};

const config = {
    headers: {
        Authorization: 'Bearer ' + RIOT_TOKEN
    }
}

module.exports = {
    getAllChamps: async (version) => {
        console.log('getting!');
        if (!version) {
            const newVer = await getDataDragonVersion();
            return get(await axios.get(`${dataDragonEndpoint}/cdn/${newVer}/data/en_US/champion.json`, config), 'data.data', []);
        } else {
            return get(await axios.get(`${dataDragonEndpoint}/cdn/${version}/data/en_US/champion.json`, config), 'data.data', []);
        }
    },
}