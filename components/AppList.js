"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AppList() {
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
    <>
      {apps.map((app) => (
        <div key={app.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 p-4">
          <div className="bg-white rounded overflow-hidden shadow-lg h-[300px] flex flex-col">
            <div className="px-6 py-4 flex-grow">
              <div className="font-bold text-xl mb-2 truncate">{app.name}</div>
              <p className="text-gray-700 text-base overflow-hidden overflow-ellipsis">
                {app.description}
              </p>
            </div>
            <div className="px-6 py-4 flex justify-between">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {app.author}
              </span>
              <Link href={{
                pathname: `/apps/${app.id}`,
                query: {name: app.name, description: app.description},
              }} className="text-blue-500 hover:underline">
                Use
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
