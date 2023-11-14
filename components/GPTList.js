"use client"

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import GPTCard from "../components/GPTCard";
import CategoryFilter from "../components/CategoryFilter";

const ENABLE_CATEGORY_FEATURE = process.env.NEXT_PUBLIC_ENABLE_CATEGORY;

export default function GPTList({ groupedGPTs }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGPTs, setFilteredGPTs] = useState({});

  useEffect(() => {
    const filtered = Object.keys(groupedGPTs).reduce((acc, category) => {
      const filteredGPTs = groupedGPTs[category].filter(gpt => {
        const nameMatches = gpt.name ? gpt.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
        const descriptionMatches = gpt.description ? gpt.description.toLowerCase().includes(searchQuery.toLowerCase()) : false;
        return nameMatches || descriptionMatches;
      });

      if (filteredGPTs.length > 0 && (!ENABLE_CATEGORY_FEATURE || selectedCategory === null || category === selectedCategory)) {
        acc[category] = filteredGPTs;
      }

      return acc;
    }, {});

    setFilteredGPTs(filtered);
  }, [searchQuery, groupedGPTs, selectedCategory]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4">
      {/* <SubmitURLForm /> */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        GPTs List
      </h2>
      <button
        onClick={scrollToTop}
        className='fixed right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full'
        title="Back to top"
        aria-label="Back to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      {ENABLE_CATEGORY_FEATURE && (
        <CategoryFilter
          groupedGPTs={groupedGPTs}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}
      <div className="my-4">
        <input
          type="search"
          placeholder="Search GPTs..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      {Object.entries(filteredGPTs).map(([category, gpts]) => (
        <div key={category} className="mb-6">
          {ENABLE_CATEGORY_FEATURE && (
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              {category} ({gpts.length})
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gpts.map((gpt) => (
              <GPTCard key={gpt.id} gpt={gpt} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
