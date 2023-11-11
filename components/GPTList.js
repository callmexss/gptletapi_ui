"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function GPTList() {
  const [groupedGPTs, setGroupedGPTs] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='mb-6'>
      {/* Render category buttons or links */}
      <div className='flex flex-wrap space-x-4 mb-4'>
        {Object.keys(groupedGPTs).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`py-2 px-4 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-transparent text-blue-700 hover:bg-blue-500 hover:text-white'} rounded transition`}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory(null)}
          className="py-2 px-4 bg-transparent text-red-600 hover:bg-red-500 hover:text-white rounded transition"
        >
          Clear Filter
        </button>
      </div>
      {Object.keys(groupedGPTs).map((category) => {
        // Filter gpts if a category is selected
        if (selectedCategory && category !== selectedCategory) {
          return null;
        }
        return (
          <div key={category}>
            <h3 className='text-2xl font-bold'>{category}</h3>
            <div className='flex flex-wrap'>
              {groupedGPTs[category].map((gpt) => {
                const description = gpt.description || '';
                const limitLength = 64;
                const truncatedDescription =
                  description.length > limitLength
                    ? `${description.substring(0, limitLength)}...`
                    : description;

                return (
                  <div key={gpt.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 2xl:w-1/5 p-2">
                    <div className="bg-white rounded overflow-hidden shadow-lg h-[300px] flex flex-col">
                      <div className="px-6 py-4 flex-grow">
                        <div className="font-bold text-xl mb-2 truncate">{gpt.name}</div>
                        <div className='item-center mb-4'>
                          <img src={gpt.image_url} className='mx-auto w-16 h-16 rounded-full flex-shrink-0 bg-gray-100' alt={gpt.name}></img>
                        </div>
                        <p className="text-gray-700 text-sm">{truncatedDescription}</p>
                      </div>
                      <div className="px-6 py-4 flex justify-between">
                        <Link
                         href={gpt.link_url} passHref
                         className="text-blue-500 hover:underline"
                         target="_blank" 
                         rel="noopener noreferrer"
                        >
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
      })}
    </div>
  );
}
