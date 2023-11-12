import { useState, useCallback } from 'react';
import axios from 'axios';

const useGPTData = () => {
  const [groupedGPTs, setGroupedGPTs] = useState({});

  const fetchGPTData = useCallback(async () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
      const { data } = await axios.get(`${apiBaseUrl}/gpts/`);
      const categories = data.reduce((acc, gpt) => {
        acc[gpt.category] = acc[gpt.category] || [];
        acc[gpt.category].push(gpt);
        return acc;
      }, {});
      setGroupedGPTs(categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return { groupedGPTs, fetchGPTData };
};

export default useGPTData;
