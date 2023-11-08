"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function GPTList() {
  const [gpts, setGPTs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await axios.get(`${apiBaseUrl}/gpts/`);
      setGPTs(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className='mb-6'>
      <div className='flex items-center justify-between mb-6 gap-2'>
        <h2 className='text-3xl font-bold tracking-tight lg:text-4xl lg:leading-[3.5rem]'>
          Find GPTs for You!
        </h2>
      </div>
      <div className='flex flex-wrap'>
        {gpts.map((gpt) => {
          const limitLength = 64;
          const truncatedDescription = gpt.description.length > limitLength
            ? `${gpt.description.substring(0, limitLength)}...`
            : gpt.description;

          const descriptionWithNewLines = truncatedDescription.split('\n').map((str, index, array) =>
            index === array.length - 1 ? str : (
              <React.Fragment key={index}>
                {str}
                <br />
              </React.Fragment>
            )
          );

          return (
            <div key={gpt.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 2xl:w-1/5 p-2">
              <div className="bg-white rounded overflow-hidden shadow-lg h-[300px] flex flex-col">
                <div className="px-6 py-4 flex-grow">
                  <div className="font-bold text-xl mb-2 truncate">{gpt.name}</div>
                  <div className='item-center mb-4'>
                    <img src={gpt.image_url} className='mx-auto w-16 h-16 rounded-full flex-shrink-0 bg-gray-100'></img>
                  </div>
                  <p className="flex text-gray-700 text-sm">
                    {descriptionWithNewLines}
                  </p>
                </div>
                <div className="px-6 py-4 flex justify-between">
                  <Link href={gpt.link_url} className="text-blue-500 hover:underline" target="_blank">
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
