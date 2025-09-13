
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./../assets/css/Booking.css";  

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    fetch('/data/mockMovies.json')
      .then(res => res.json())
      .then(data => {
        const m = data.find(mv => mv.id === parseInt(id));
        setMovie(m);
      })
      .catch(err => console.error(err));
  }, [id]);

  const today = new Date().toISOString().split('T')[0];

  const seatLayout = [
    [
      { seatId: 'C1', type: 'balcony' }, { seatId: 'C2', type: 'balcony' }, { seatId: 'C3', type: 'balcony' }, { seatId: 'C4', type: 'balcony' }, { seatId: 'C5', type: 'balcony' }
    ],
    [
      { seatId: 'D1', type: 'balcony' }, { seatId: 'D2', type: 'balcony' }, { seatId: 'D3', type: 'balcony' }, { seatId: 'D4', type: 'balcony' }, { seatId: 'D5', type: 'balcony' }
    ],
    [
      { seatId: 'A1', type: 'regular' }, { seatId: 'A2', type: 'regular' }, { seatId: 'A3', type: 'regular' }, { seatId: 'A4', type: 'regular' }, { seatId: 'A5', type: 'regular' }
    ],
    [
      { seatId: 'B1', type: 'regular' }, { seatId: 'B2', type: 'regular' }, { seatId: 'B3', type: 'regular' }, { seatId: 'B4', type: 'regular' }, { seatId: 'B5', type: 'regular' }
    ]
  ];

  const prices = { regular: 150, balcony: 250 };

  const toggleSeat = (seatObj) => {
    const key = seatObj.seatId + '-' + seatObj.type;
    const found = selectedSeats.find(s => s.seatKey === key);
    if (found) {
      setSelectedSeats(prev => prev.filter(s => s.seatKey !== key));
    } else {
      setSelectedSeats(prev => [...prev, { seatKey: key, ...seatObj }]);
    }
  };

  const handleBooking = () => {
    if (!date) return alert("Select date");
    if (!time) return alert("Select time");
    if (selectedSeats.length === 0) return alert("Select at least one seat");

    navigate(`/confirmation/${id}`, {
      state: { movie, date, time, selectedSeats }
    });
  };

  if (!movie) return <p>Loading...</p>;

  const total = selectedSeats.reduce((sum, s) => sum + prices[s.type], 0);

  return (
    <div className="booking-container row">
      
      <div className="col-md-5 text-center">
        <img src={movie.img} className="img-fluid rounded shadow" alt={movie.title} />
      </div>

      <div className="col-md-7">
        <h2 className="mb-3">{movie.title}</h2>

        <div className="form-row mb-3">
          <label>Date:</label>
          <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <div className="form-row mb-3">
          <label>Time:</label>
          <select value={time} onChange={e => setTime(e.target.value)}>
            <option value="">-- Select Time --</option>
            <option>10:00 AM</option>
            <option>1:30 PM</option>
            <option>6:00 PM</option>
            <option>9:30 PM</option>
          </select>
        </div>

        <div className="seat-layout mb-3">
          {seatLayout.map((row, rowIdx) => (
            <div key={rowIdx} className="seat-row">
              {row.map((seatObj) => {
                const isSelected = selectedSeats.some(s => s.seatKey === seatObj.seatId + '-' + seatObj.type);
                return (
                  <div
                    key={seatObj.seatId}
                    className={`seat ${seatObj.type} ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSeat(seatObj)}
                  >
                    {seatObj.seatId}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="legend mb-3">
          <span><div className="seat regular"></div> Regular (₹{prices.regular})</span>
          <span><div className="seat balcony"></div> Balcony (₹{prices.balcony})</span>
          <span><div className="seat selected"></div> Selected</span>
        </div>

        <div className="summary">
          <p>Selected: {selectedSeats.map(s => s.seatId).join(', ') || 'None'}</p>
          <p>Total: ₹{total}</p>
          <button className="btn btn-danger" onClick={handleBooking}>Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default Booking;
