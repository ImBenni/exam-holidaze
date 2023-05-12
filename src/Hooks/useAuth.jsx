import { useState } from "react";

const baseUrl = "https://api.noroff.dev/api/v1/holidaze/auth";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);

  const registerUser = async (userData) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }

      const json = await response.json();
      setUser(json);

      const profile = {
        name: json.name,
        avatar: json.avatar,
        email: json.email,
        venueManager: json.venueManager,
      };
      localStorage.setItem("profile", JSON.stringify(profile));

      setIsLoading(false);
      return true
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      return false
    }
  };

  const loginUser = async (userData) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }

      const json = await response.json();

      setUser(json);
      localStorage.setItem("accessToken", json.accessToken);

      const profile = {
        name: json.name,
        avatar: json.avatar,
        email: json.email,
        venueManager: json.venueManager,
      };
      localStorage.setItem("profile", JSON.stringify(profile));

      setIsLoading(false);
      return true
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      return false
    }
  };

  return { registerUser, loginUser, user, isLoading, isError };
}
