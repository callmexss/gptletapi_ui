"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    <div className='mb-6'>
      <div className='flex items-center justify-between mb-6 gap-2'>
        <h2 className='text-3xl font-bold tracking-tight lg:text-4xl lg:leading-[3.5rem]'>
          Try Our APPs!
        </h2>
      </div>
      <div className='flex flex-wrap'>
        {apps.map((app) => {
          const limitLength = 64;
          const truncatedDescription = app.description.length > limitLength
            ? `${app.description.substring(0, limitLength)}...`
            : app.description;

          const descriptionWithNewLines = truncatedDescription.split('\n').map((str, index, array) =>
            index === array.length - 1 ? str : (
              <React.Fragment key={index}>
                {str}
                <br />
              </React.Fragment>
            )
          );

          return (
            <div key={app.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/5 p-2">
              <div className="bg-white rounded overflow-hidden shadow-lg h-[300px] flex flex-col">
                <div className="px-6 py-4 flex-grow">
                  <div className="font-bold text-xl mb-2 truncate">{app.name}</div>
                  <p className="text-gray-700 text-base">
                    {descriptionWithNewLines}
                  </p>
                </div>
                <div className="px-6 py-4 flex justify-between">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {app.author}
                  </span>
                  <Link href={{
                    pathname: `/apps/${app.id}`,
                    query: { name: app.name, description: app.description },
                  }} className="text-blue-500 hover:underline">
                    Use
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
