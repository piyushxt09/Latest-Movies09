import React, { useState, useEffect } from 'react';
import './Contentcon.css';

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';



const getClassByRate = (vote) => {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

const ContentCon = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const ul = document.querySelector('nav ul');
    const body = document.body;
    const HadleNavbar = () => {
        ul.classList.toggle('active');
        body.classList.toggle('active');
    }



    useEffect(() => {
        getMovies(API_URL);
    }, []);

    const getMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            getMovies(SEARCH_API + searchTerm);
            setSearchTerm('');
        }

    };

    return (
        <>
            <i className="fa-solid fa-bars navbarBtn" style={{ color: 'whitesmoke' }} onClick={HadleNavbar}></i>
            <header>
                <h2>latest movies</h2>
                <nav>
                    <ul>
                        <li><a href="#" className="active">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </nav>
                <form id="form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        id="search"
                        className="search"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
                </form>
            </header>
            <main id="main">
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className="movie">
                            <img src={IMG_PATH + movie.poster_path} alt={movie.title} />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <span className={getClassByRate(movie.vote_average)}>{movie.vote_average}</span>
                            </div>
                            <div className="overview">
                                <h3>Overview</h3>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="not-found">
                        <h3>Not Found!</h3>
                        <p>No movies available.</p>
                    </div>
                )}
            </main>
        </>
    );
};

export default ContentCon;
