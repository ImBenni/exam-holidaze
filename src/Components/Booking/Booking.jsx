import { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { useCreateBooking } from "../../Hooks/useBook";

import styles from "../Venue/VenuePage/VenuePage.module.scss";
import { Button, TextField, Alert } from "@mui/material";

function Booking({ venue, id }) {
  const token = localStorage.getItem("accessToken");
  const { createBooking } = useCreateBooking();
  const [newBooking, setNewBooking] = useState({});

  const handleInputChange = (event) => {
    setNewBooking({
      ...newBooking,
      [event.target.name]: event.target.value,
    });
  };

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      color: "#23dd99",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    setNewBooking({
      ...newBooking,
      dateFrom: ranges.selection.startDate,
      dateTo: ranges.selection.endDate,
    });
  };

  function getBookedDates(bookings) {
    const bookedDates = [];
    for (const booking of bookings) {
      const startDate = new Date(booking.dateFrom);
      const endDate = new Date(booking.dateTo);
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        bookedDates.push(new Date(d));
      }
    }
    return bookedDates;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookingData = {
      ...newBooking,
      guests: Number(newBooking.guests),
      venueId: id,
    };

    try {
      await createBooking(bookingData);
      setNewBooking({});
      window.location.reload();
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  };

  return (
<>
      <form onSubmit={handleSubmit}>
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          onChange={handleSelect}
          disabledDates={getBookedDates(venue.bookings)}
          data-testid="my-date-picker"
          minDate={addDays(new Date(), 0)}
        
        />

        <TextField
          type="number"
          name="guests"
          label="Guests"
          className={styles.guest}
          inputProps={{ min: "1", max: venue ? venue.maxGuests : undefined }}
          onChange={handleInputChange}
          value={newBooking.guests || ""}
          required
        />
        {token ? (
          <Button type="submit" className={styles.submit} color="primary" variant="contained" size="large">
            Create Booking
          </Button>
        ) : (
          <Alert severity="info" sx={{ mb: 3 }}>
            Please log in to create a booking.
          </Alert>
        )}
      </form>
    </>
  );
}

export default Booking;
