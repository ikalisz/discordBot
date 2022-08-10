const axios = require('axios');
const get = require('lodash/get');
const {
    dataDragonEndpoint,
} = require('./constants');

module.exports = {
    getDataDragonVersion: async () => {
        return get(await axios.get(`${dataDragonEndpoint}/api/versions.json`), '0');
    },
    getAllChamps: async (version) => {
        if (!version) {
            const newVer = this.getDataDragonVersion();
            return get(await axios.get(`${dataDragonEndpoint}/cdn/${newVer}/data/en_US/champion.json`), 'data', []);
        } else {
            return get(await axios.get(`${dataDragonEndpoint}/cdn/${version}/data/en_US/champion.json`), 'data', []);
        }
    },
}