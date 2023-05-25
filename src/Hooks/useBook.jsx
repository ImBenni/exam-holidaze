import { useState, useEffect } from "react";

const baseUrl = "https://api.noroff.dev/api/v1/holidaze/bookings";

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchBookings() {
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetch(`${baseUrl}?_venue=true&_customer=true&sort=created&sortOrder=desc`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setBookings(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }
    fetchBookings();
  }, [token]);

  return { bookings, isLoading, isError, setBookings };
}

export function useCreateBooking() {
  const [setCreateBookings] = useState([]);
  const token = localStorage.getItem("accessToken");

  const createBooking = async (newBooking) => {
    try {
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newBooking,
          dateFrom: new Date(newBooking.dateFrom).toISOString(),
          dateTo: new Date(newBooking.dateTo).toISOString(),
          guests: Number(newBooking.guests),
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong while creating the booking.");
      }

      const data = await response.json();
      setCreateBookings((prevBookings) => [...prevBookings, data]);
    } catch (error) {
      console.log(error);
    }
  };

  return { createBooking };
}

export async function deleteBooking(bookingId) {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${baseUrl}/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.log(error);
  }

  return { deleteBooking };
}
