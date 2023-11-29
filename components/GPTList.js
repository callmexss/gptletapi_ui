"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import GPTCard from "../components/GPTCard";

export default function GPTList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gpts, setGpts] = useState([]);
  const [totalGPTs, setTotalGPTs] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  const secureUrl = (url) => {
    const useHttps = process.env.NEXT_PUBLIC_USE_HTTPS === 'true';
    console.log("use https:", useHttps);

    if (useHttps) {
      return url.replace('http://', 'https://');
    } else {
      return url.replace('https://', 'http://');
    }
  };


  const loadGPTs = async (url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/gpts/?page=1&search=${searchQuery}`) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch GPTs: ${response.status}`);
    }
    const data = await response.json();
    console.log(secureUrl(data.next));
    setNextPageUrl(secureUrl(data.next));
    setTotalGPTs(data.count);
    setGpts(data.results);
  };

  useEffect(() => {
    loadGPTs();
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = async () => {
    if (nextPageUrl) {
      const response = await fetch(nextPageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch more GPTs: ${response.status}`);
      }
      const data = await response.json();
      console.log(secureUrl(data.next));
      setNextPageUrl(secureUrl(data.next));
      setGpts(prevGpts => [...prevGpts, ...data.results]);
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
      {nextPageUrl ? (
        <button
          onClick={handleLoadMore}
          className="w-full py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Load More
        </button>
      ) : gpts.length > 0 ? (
        <div className="w-full py-2 my-2 text-center text-gray-700">
          You've reached the end of the list.
        </div>
      ) : null}
    </div>
  );
}
