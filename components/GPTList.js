import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import useGPTData from "../hooks/useGPTData";
import GPTCard from "../components/GPTCard";
import CategoryFilter from "../components/CategoryFilter";
import SubmitURLForm from "../components/SubmitURLForm";

export default function GPTList() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { groupedGPTs, fetchGPTData } = useGPTData();

  useEffect(() => {
    fetchGPTData();
  }, [fetchGPTData]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4">
      <SubmitURLForm />
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
      <CategoryFilter
        groupedGPTs={groupedGPTs}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {Object.keys(groupedGPTs).map((category) =>
        selectedCategory && category !== selectedCategory ? null : (
          <div key={category} className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              {category} ({groupedGPTs[category].length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groupedGPTs[category].map((gpt) => (
                <GPTCard key={gpt.id} gpt={gpt} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
