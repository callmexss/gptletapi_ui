"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import AppList from '@/components/AppList';
import GPTList from '@/components/GPTList';

export default function Home() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await axios.get(`${apiBaseUrl}/apps/`);
      setApps(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap">
      <>
        <AppList/>
        <GPTList/>
      </>
    </div>
  );
}
