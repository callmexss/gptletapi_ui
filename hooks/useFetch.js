import axios from 'axios';
import { useState, useCallback } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  }, [url]);

  return { data, error, fetchData };
};

export default useFetch;
