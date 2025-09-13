import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Movies({ movies, itemsPerPage = 6 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="now-showing">
      <div className="container my-5">
        <h2 className="mb-4 text-center">Now Showing</h2>
        <div className="row">
          {currentMovies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.id}>
              <div className="card">
                <img src={movie.img} className="card-img-top" alt={movie.title} />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.desc}</p>
                  <Link to={`/bookings/${movie.id}`} className="btn btn-primary">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            {[...Array(totalPages)].map((_, idx) => (
              <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => goToPage(idx + 1)}>
                  {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Movies;
