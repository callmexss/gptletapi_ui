"use client";

import React from 'react';
import Link from 'next/link';

const GPTCard = ({ gpt }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out border border-gray-200 hover:border-blue-500">
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800 truncate hover:text-blue-600">{gpt.name}</h3>
        <div className="mx-auto overflow-hidden hover:scale-150 hover:border-blue-400 transition duration-300 ease-in-out">
          <img
            src={gpt.image_url}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto bg-gray-100 mb-3 transition-transform duration-300 ease-in-out hover:scale-150"
            alt={gpt.name}
          />
        </div>
        <p className="text-gray-700 text-sm mb-4 hover:text-gray-900">{gpt.description}</p>
        <Link 
         className="text-blue-500 hover:text-white inline-block bg-blue-100 hover:bg-blue-500 rounded-full px-4 py-1 transition duration-300 ease-in-out shadow hover:shadow-md"
         href={gpt.link_url}
         passHref
        >
          Use
        </Link>
      </div>
    </div>
  );
};

export default GPTCard;
