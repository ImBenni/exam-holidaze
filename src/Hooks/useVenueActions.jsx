import { useState } from "react";

const baseUrl = "https://api.noroff.dev/api/v1/holidaze/venues";

export function useVenueActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const token = localStorage.getItem("accessToken");

  const createVenue = async (venue) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(venue),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsLoading(false);
      return await response.json();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const editVenue = async (venueId, updates) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/${venueId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsLoading(false);
      return await response.json();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const deleteVenue = async (venueId) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/${venueId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsLoading(false);
      return true;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return { createVenue, editVenue, deleteVenue, isLoading, isError };
}
