"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

export default function GPTList() {
  const [groupedGPTs, setGroupedGPTs] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const isGptsUrl = (url) => {
    const pattern = /^https:\/\/chat\.openai\.com\/g\/[a-zA-Z0-9-]+$/;
    return pattern.test(url);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = async () => {
    if (isGptsUrl(urlInput)) {
      setUrlError('');
      setSubmitMessage('Your URL is being processed, please wait...');

      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        await axios.post(`${apiBaseUrl}/process_url/`, { url: urlInput });

        setSubmitMessage('URL successfully submitted. Processing may take some time.');
      } catch (error) {
        console.error('Error submitting URL:', error);
        setSubmitMessage('Error occurred while submitting the URL.');
      }
    } else {
      setUrlError('Invalid URL. Please enter a valid GPTs URL.');
      setSubmitMessage('');
    }
  };

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
      <div className='mb-8'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center mb-4'>Submit Your GPTs URL</h2>
        <div className='flex flex-col sm:flex-row items-center gap-3'>
          <input
            type='text'
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder='https://chat.openai.com/g/...'
            className='flex-grow border p-2 rounded w-full'
          />
          <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Submit
          </button>
        </div>
        {urlError && <p className='text-red-500 text-center mt-2'>{urlError}</p>}
        {submitMessage && <p className='text-green-500 text-center mt-2'>{submitMessage}</p>}
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Find the BEST GPTs for You!
      </h2>
      <button
        onClick={scrollToTop}
        className='fixed right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full'
        title="Back to top"
        aria-label="Back to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
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
