import axios from 'axios';

// Uses REST Countries API //

export default class CountyAPI {

}

CountyAPI.prototype.getCountry = async function(code) {
    const result = axios({
        method: 'get',
        url: `https://restcountries.eu/rest/v2/alpha?codes=${code}`,
    });
    return result;
}