import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./../assets/css/Confiramtion.css";  


function Confirmation() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { movie, selectedSeats } = location.state || {};

  if (!movie) {
    return (
      <div className="container text-center mt-5">
        <h2>No booking found</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-4 text-center text-success">🎉 Booking Confirmed!</h2>
        
        <div className="row ">
          <div className="confirmation-img col-md-4 text-center">
            <img src={movie.img} alt={movie.title} className="img-fluid rounded" />
          </div>
          <div className="confirmation-details  col-md-8">
            <h3>{movie.title}</h3>
            <p><strong>Duration:</strong> {movie.duration}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Seats:</strong> {selectedSeats.map(s => s.seatId).join(", ")}</p>
            <p><strong>Total Price:</strong> ₹{selectedSeats.length * 150}</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-primary me-3" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(`/bookings/${id}`)}>
            Book Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
