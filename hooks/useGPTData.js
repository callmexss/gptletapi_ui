import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { groupByCategory } from './utilityFunctions';

const useGPTData = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { data, error, fetchData } = useFetch(`${apiBaseUrl}/gpts/`);
  const [groupedGPTs, setGroupedGPTs] = useState({});

  useEffect(() => {
    if (data) {
      setGroupedGPTs(groupByCategory(data));
    }
  }, [data]);

  return { groupedGPTs, fetchGPTData: fetchData };
};

export default useGPTData;
