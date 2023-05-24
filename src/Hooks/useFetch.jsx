import { useCallback, useEffect, useState } from "react";
const baseUrl = "https://api.noroff.dev/api/v1/holidaze";

export function useVenue(offset = 0, limit = 20) {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);

        let url = `${baseUrl}/venues?_bookings=true&_owner=true&sort=created&sortOrder=desc&offset=${offset}`;
        if (limit) {
          url += `&limit=${limit}`;
        }
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setVenues((prevVenues) => [...prevVenues, ...json]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    }
    getData();
  }, [offset, limit]);

  return [venues, isLoading, isError, setVenues];
}

export function useVenueById(id) {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(`${baseUrl}/venues/${id}?_bookings=true&_owner=true`, { method: "GET" });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setVenue(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      }
    }

    if (id) {
      getData();
    }
  }, [id]);

  return [venue, isLoading, isError];
}

export function useProfile(profileName) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const token = localStorage.getItem("accessToken");

  const refreshProfile = useCallback(async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/profiles/${profileName}?_bookings=true&_venues=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setProfile(json);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  }, [profileName, token]);
  useEffect(() => {
    if (profileName) {
      refreshProfile();
    }
  }, [profileName, refreshProfile]);

  const updateProfileAvatar = async (newAvatarUrl) => {
    try {
      const response = await fetch(`${baseUrl}/profiles/${profileName}/media`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar: newAvatarUrl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      refreshProfile();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (profileName) {
      refreshProfile();
    }
  }, [profileName, refreshProfile]);

  return [profile, isLoading, isError, refreshProfile, updateProfileAvatar];
}

export function useOtherProfile(profileName) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const token = localStorage.getItem("accessToken");

  const fetchOtherProfile = useCallback(async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/profiles/${profileName}?_bookings=true&_venues=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setProfile(json);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  }, [profileName, token]);

  useEffect(() => {
    if (profileName) {
      fetchOtherProfile();
    }
  }, [profileName, fetchOtherProfile]);

  return [profile, isLoading, isError];
}

export function useVenueProfile(profileName) {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);

        let url = `${baseUrl}/profiles/${profileName}/venues?_bookings=true&sort=created&sortOrder=desc`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setVenues(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    }
    getData();
  }, [profileName, token]);

  return [venues, isLoading, isError, setVenues];
}
