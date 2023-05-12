import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../Hooks/useFetch";
import { Link } from 'react-router-dom';

function BookingForm() {
  const [venues, isLoading, isError] = useFetch("/venues");
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const { id } = useParams();
  const venue = venues.find((p) => p.id === id);

  const [bookingData, setBookingData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: "",
    venueId: id,
  });

  const handleInputChange = (event) => {
    setBookingData({
      ...bookingData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you will call the API to create the booking
    // For now, let's just log the bookingData
    console.log(bookingData);
  };

  if (!isLoggedIn) {
    return (
      <div>
        <p>You need to be logged in to book a venue. Please <Link to="/login">Log in</Link></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date From:
        <input type="date" name="dateFrom" onChange={handleInputChange} required />
      </label>
      <label>
        Date To:
        <input type="date" name="dateTo" onChange={handleInputChange} required />
      </label>
      <label>
        Guests:
        <input type="number" name="guests" onChange={handleInputChange} required />
      </label>
      <button type="submit">Book</button>
    </form>
  );
}

export default BookingForm;
