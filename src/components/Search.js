import './App.css';
import React, { useState, useEffect } from 'react';
import MovieDB from './MovieDB';
import CountryAPI from './CountryAPI';

const movie = new MovieDB();
const country = new CountryAPI();
let trending = [];

export default function Search() {

    const [prev_search_value, setPrevSearchValue] = useState('');

    const [display_type, setDisplayType] = useState('poster');
    const [movies, setMovies] = useState([]);
    const [selected_movie, setSelectedMovie] = useState();
    const [trending_opts, setTrendingOpts] = useState();

    useEffect( () => {
        const getTrending = async () => {
            const res = await movie.getTrending();
            const results = res.data.results;
            setMovies(res.data.results);
            for (let i = 0; i < results.length; i++) {
                trending.push(results[i].title);
            }
            let arr = [];
            for (let i = 0; i < trending.length; i++) {
                arr.push(
                    <option key={trending[i] + `${i}`} value={trending[i]} />
                );
            }
            setTrendingOpts(arr);
        }
        getTrending();
    }, []);

    const handleSubmit = function(event) {
        event.preventDefault();
        const search_value = event.target.value;

        if (search_value === '') {
            return;
        } else if (search_value === prev_search_value) {
            setDisplayType('poster');
            return;
        }

        movie.searchMovie(search_value)
            .then(res => {
                const results = res.data.results;

                let arr = [];
                for (let i = 0; i < results.length; i++) {
                    if (results[i].hasOwnProperty('poster_path') && results[i].poster_path !== null) {
                        arr.push(results[i]);
                    }
                }
                setDisplayType('poster');
                setMovies(arr);
                setPrevSearchValue(search_value);
            });
    }


    // Helper Sub Components //
    function PosterDisplay(props) {

        const handlePosterClick = (movie_obj) => {
            setSelectedMovie(movie_obj);
            setDisplayType('streaming');
            if (window.scrollY) {
                window.scroll(0,0);
            }
        }
    
        let images = [];
        for (let i = 0; i < 9; i++) {
            if (i < props.images.length) {
                images.push(
                    <div className="poster" id={props.images[i].id}>
                        <img className="poster_img"
                            onClick={ () => {
                                handlePosterClick(props.images[i]);
                            }}
                            src={""+movie.image_url+movie.poster_size+props.images[i].poster_path}
                            alt={""+props.images[i].original_title}/>
                    </div>
                );
            } else {
                images.push(
                    <div className="poster">
    
                    </div>
                );
            }
        }
    
        return (
            <div className="display">
                <div className="columns">
                    
                    <div className="column">
                        {images[0]}
                        {images[3]}
                        {images[6]}
                    </div>
                    <div className="column">
                        {images[1]}
                        {images[4]}
                        {images[7]}
                    </div>
                    <div className="column">
                        {images[2]}
                        {images[5]}
                        {images[8]}
                    </div>
                    
                </div>
            </div>
        );
    }

    function StreamingDisplay(props) {
        
        const [countries, setCoutries] = useState([]);
        
        const mvi = props.movie_obj;
    
        useEffect( () => {
            const getProviders = async function() {
                let providers = {};
                let prov_arr = [];
                const res = await movie.getMovieProviders(mvi.id);
                providers = res.data.results;
                prov_arr = Object.entries(providers);
                let arr = [];
                for (let i = 0; i < prov_arr.length; i++) {
                    if (prov_arr[i][1].hasOwnProperty('flatrate')) {
                        const country_name = await country.getCountry(prov_arr[i][0]);

                        const streaming = prov_arr[i][1].flatrate;
                        let logos = [];
                        for (let j = 0; j < streaming.length; j++) {
                            logos.push(
                                <img 
                                    key={""+streaming[j].provider_id} 
                                    src={""+movie.image_url+movie.logo_size+streaming[j].logo_path} 
                                    alt={""+streaming[j].provider_name} 
                                    style={{ borderRadius: "20px", marginRight: "10px" }}
                                />
                            );
                        }
                        arr.push(
                            <div className="country" key={prov_arr[i][0]}>
                                <h2>{country_name.data[0].name}</h2>
                                {logos}
                            </div>
                        );
                    }
                }
                if (arr.length === 0) {
                    arr.push(
                        <h2 key="none" style={{ color: "gray", fontSize: "24px"}}>
                            Sorry, this movie is not available for streaming.
                        </h2>
                    );
                }
                setCoutries(arr);
            }
            getProviders();
        }, [mvi]);
        
        return (
            <div className="display">
                <div className="columns">
                    <div className="column is-5">
                        <img src={""+movie.image_url+movie.poster_size+mvi.poster_path} alt={""+mvi.title}/>
                    </div>
                    <div className="column"></div>
                    <div className="column is-6 info_pannel">
                        <h3 onClick={() => { setDisplayType('poster'); if(window.scrollY) window.scroll(0,0); }} style={{ fontSize: "18px", color: "gray", textAlign: "right", cursor: "pointer", textDecoration: "underline" }}>Back</h3>
                        <h1>{mvi.title}</h1>
                        {countries}
                    </div>
                </div>
            </div>
        );
    }

    function Display(props) {
        if (props.type === 'poster') {
            return <PosterDisplay images={props.movies}/>;
        }
        if (props.type === 'streaming') {
            return <StreamingDisplay movie_obj={props.movie_obj}/>;
        }
    
        return <div></div>;
    }

    return (
        <div className="search-component">
            <div className="search-bar field" >
                <form autoComplete="off" onSubmit={ (event) => event.preventDefault() } >
                    <div className="control">
                        <input className="input is-rounded" list="movies" id="searchBar" type="text" spellCheck="false" placeholder="Search for a Movie" onChange={handleSubmit} />
                        <datalist id="movies">
                            {trending_opts}
                        </datalist>
                    </div>
                </form>
            </div>

            <Display type={display_type} movies={movies} movie_obj={selected_movie}/>
        </div>
    );
    
}