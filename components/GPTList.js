"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import GPTCard from "../components/GPTCard";

export default function GPTList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gpts, setGpts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGPTs, setTotalGPTs] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  const loadGPTs = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/gpts/?page=${currentPage}&search=${searchQuery}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch GPTs: ${response.status}`);
    }
    const data = await response.json();
    setTotalGPTs(data.count);
    setGpts(prevData => currentPage === 1 ? data.results : [...prevData, ...data.results]);
    setNextPageUrl(data.next);
  };

  useEffect(() => {
    loadGPTs();
  }, [currentPage, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    if (nextPageUrl) {
      loadGPTs(nextPageUrl);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        GPTs List - Total: {totalGPTs}
      </h2>
      <button
        onClick={scrollToTop}
        className='fixed right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full'
        title="Back to top"
        aria-label="Back to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      <div className="my-4">
        <input
          type="search"
          placeholder="Search GPTs..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gpts.map((gpt) => (
          <GPTCard key={gpt.id} gpt={gpt} />
        ))}
      </div>
      {nextPageUrl && (
        <button
          onClick={handleLoadMore}
          className="w-full py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Load More
        </button>
      )}
    </div>
  );
}
