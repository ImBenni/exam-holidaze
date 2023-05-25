import { useState } from "react";

const baseUrl = "https://api.noroff.dev/api/v1/holidaze/auth";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
        const errorData = await response.json();
        throw new Error(errorData.errors[0].message);
      }
      
      

      const json = await response.json();
      setUser(json);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
      return false;
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

      const profile = {
        name: json.name,
        avatar: json.avatar,
        email: json.email,
        venueManager: json.venueManager,
      };

      await localStorage.setItem("accessToken", json.accessToken);
      await localStorage.setItem("profile", JSON.stringify(profile));
      
      setUser(json);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      return false;
    }
  };

  return { registerUser, loginUser, user, isLoading, isError, errorMessage };
}
