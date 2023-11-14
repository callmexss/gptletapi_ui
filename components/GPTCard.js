import React from 'react';
import Link from "next/link";

const GPTCard = ({ gpt }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="p-4">
        <div className="font-bold text-lg mb-2 truncate">{gpt.name}</div>
        {/* <img
          src={gpt.image_url}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full object-cover bg-gray-100 mb-3"
          alt={gpt.name}
        /> */}
        <p className="text-gray-700 text-sm mb-4">{gpt.description}</p>
        <Link 
         href={gpt.link_url} 
         passHref 
         className="text-blue-500 hover:underline" 
         target="_blank" 
         rel="noopener noreferrer"
        >
          Use
        </Link>
      </div>
    </div>
  );
};

export default GPTCard;
