import './App.css';
import React, {useState} from 'react';
import MovieDB from './MovieDB.js';

const movie = new MovieDB();

let changeDisplayType = undefined;
let changeSelectedMovie = undefined;

function PosterDisplay(props) {

    const handlePosterClick = (movie_obj) => {
        changeSelectedMovie(movie_obj);
        changeDisplayType('streaming');
        //console.log('Poster clicked');
        //console.log(movie_obj);
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

    let providers = {};
    
    console.log(props.movie_obj);

    movie.getMovieProviders(props.movie_obj.id)
        .then(res => {
            providers = res.data.results;
            console.log(providers);
        });
    movie.getProviderCountries().then(res => {console.log(res.data)});



    return (
        <div className="display">
            <div className="columns">
                <div className="column is-5">
                    <img src={""+movie.image_url+movie.poster_size+props.movie_obj.poster_path} alt={""+props.movie_obj.original_title}/>
                </div>
                <div className="column"></div>
                <div className="column is-6 info_pannel">
                    <h1>{props.movie_obj.original_title}</h1>
                    <div className="country">
                        <h2>US Streaming</h2>
                    </div>
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

export default function Search() {

    const [search_value, setSearchValue] = useState('');
    const [prev_search_value, setPrevSearchValue] = useState('');

    const [display_type, setDisplayType] = useState('poster');
    const [movies, setMovies] = useState([]);
    const [selected_movie, setSelectedMovie] = useState();

    changeDisplayType = (new_type) => {
        setDisplayType(new_type);
    }

    changeSelectedMovie = (new_movie_obj) => {
        setSelectedMovie(new_movie_obj);
        //console.log('change selected movie to: ');
        //console.log(new_movie_obj);
        //console.log('selected movie is now: ');
        //console.log(selected_movie);
    }

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (search_value === '') {
            return;
        } else if (search_value === prev_search_value) {
            setDisplayType('poster');
            return;
        }

        movie.searchMovie(search_value)
            .then(res => {
                const results = res.data.results;

                console.log(res.data);

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

    return (
        <div>
            <div className="search-bar field">
                <form onSubmit={handleSubmit} >
                    <div className="control">
                        <input className="input is-rounded" type="text" placeholder="Search" onChange={handleChange}/>
                    </div>
                </form>
            </div>

            <Display type={display_type} movies={movies} movie_obj={selected_movie}/>
        </div>
    );
    
}