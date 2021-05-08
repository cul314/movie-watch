import axios from 'axios';

// Uses The Movie Database API //

export default class Movies {
    constructor() {
        this.base_url = 'https://api.themoviedb.org/3/';
        this.image_url = null;
        this.poster_size = 'w500';
        this.logo_size = 'w92';
        this.api_key = 'd363ec5b2388fdeedd9b1c0a068b5fe3';

        let url = this.base_url + 'configuration?api_key=' + this.api_key;
        axios({
            method: 'get',
            url: url,
        })
            .then( res => {
                this.image_url = res.data.images.secure_base_url;
            });
    }
}

Movies.prototype.getMovie = async function(id) {
    const result = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${id}?api_key=${this.api_key}`,
    });
    return result;
}

Movies.prototype.getMovieProviders = async function(id) {
    const result = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${this.api_key}`,
    });
    return result;
}

Movies.prototype.getProviderCountries = async function() {
    const result = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/watch/providers/regions?api_key=${this.api_key}&language=en-US`,
    });
    return result;
}

Movies.prototype.searchMovie = async function(keyword) {
    const result = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?api_key=${this.api_key}&query=${keyword}&page=1&include_adult=false`
    })
    return result;
}

Movies.prototype.getTrending = async function() {
    const result = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.api_key}`
    })
    return result;
}