import React, { useEffect, useState } from "react";
import Movies from "./Movies";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";


function Home() {
 const [movies, setMovies] = useState([]);

 useEffect(() => {
  fetch("/data/mockMovies.json")
    .then((res) => res.json())
    .then((data) => setMovies(data))
    .catch((err) => console.error("Error fetching movies:", err));
}, []);


  return (
    <>
      <nav className="nav-bar">
        <div className="brand"><a href="">Movies</a></div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="movies-list">Movies</a></li>
          <li><a href="/bookings">Bookings</a></li>
           <li><a href="/bookings">Offers</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Login / Signup</a></li>
        </ul>
      </nav>

      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {movies.map((movie, index) => (
            <div key={movie.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={movie.img} className="d-block w-100 carousel-img" alt={movie.title} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      <Movies movies={movies} />
    </>
  );
}

export default Home;
