"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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
        console.error("Error fetching data:", error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Find the BEST GPTs for You!
      </h2>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Object.keys(groupedGPTs).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`py-2 px-3 sm:px-4 text-sm sm:text-lg ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-blue-700 hover:bg-blue-500 hover:text-white"
            } rounded transition duration-300 ease-in-out`}
          >
            {category} ({groupedGPTs[category].length})
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory(null)}
          className="py-2 px-3 sm:px-4 text-sm sm:text-lg bg-red-200 text-red-600 hover:bg-red-500 hover:text-white rounded transition duration-300 ease-in-out"
        >
          Clear Filter
        </button>
      </div>
      {Object.keys(groupedGPTs).map((category) =>
        selectedCategory && category !== selectedCategory ? null : (
          <div key={category} className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              {category} ({groupedGPTs[category].length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groupedGPTs[category].map((gpt) => (
                <div
                  key={gpt.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <div className="p-4">
                    <div className="font-bold text-lg mb-2 truncate">
                      {gpt.name}
                    </div>
                    <img
                      src={gpt.image_url}
                      className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full object-cover bg-gray-100 mb-3"
                      alt={gpt.name}
                    />
                    <p className="text-gray-700 text-sm mb-4">
                      {gpt.description}
                    </p>
                    <Link
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={gpt.link_url}
                      passHref
                    >
                      Use
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
