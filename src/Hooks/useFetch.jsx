import { useEffect, useState } from "react";
const baseUrl = "https://api.noroff.dev/api/v1/holidaze";

export function useFetch(endpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetch(`${baseUrl}${endpoint}`);
        const json = await response.json();
        setData(json);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    }
    getData();
  }, [endpoint]);

  return [data, isLoading, isError];
}
