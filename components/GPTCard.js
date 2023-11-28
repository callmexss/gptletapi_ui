"use client"

import React from 'react';
import Link from 'next/link';

const GPTCard = ({ gpt }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out border border-gray-200 hover:border-blue-500">
      <div className="p-4">
        <div className="font-bold text-lg mb-2 text-gray-800 truncate">{gpt.name}</div>
        <img
          src={gpt.image_url}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full object-cover bg-gray-100 mb-3 border-2 border-blue-300"
          alt={gpt.name}
        />
        <p className="text-gray-700 text-sm mb-4">{gpt.description}</p>
        <Link className="text-blue-500 hover:text-blue-700 hover:underline inline-block bg-blue-100 rounded-full px-4 py-1 transition duration-300 ease-in-out" href={gpt.link_url} passHref>
          Use
        </Link>
      </div>
    </div>
  );
};

export default GPTCard;
