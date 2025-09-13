import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/Home.css"
import Home from "./components/Home";
import Booking from './components/Booking';
import Movies from './components/Movies';
import Confirmation from './components/Confirmation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies-list" element={<Movies/>} />
        <Route path="/bookings/:id" element={<Booking />} />
         <Route path="/confirmation/:id" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
