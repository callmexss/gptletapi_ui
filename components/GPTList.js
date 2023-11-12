import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import useGPTData from "../hooks/useGPTData";
import GPTCard from "../components/GPTCard";
import CategoryFilter from "../components/CategoryFilter";
import SubmitURLForm from "../components/SubmitURLForm";

export default function GPTList() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGPTs, setFilteredGPTs] = useState({});
  const { groupedGPTs, fetchGPTData } = useGPTData();

  useEffect(() => {
    fetchGPTData();
  }, [fetchGPTData]);

  useEffect(() => {
    const filtered = searchQuery ? Object.keys(groupedGPTs).reduce((acc, category) => {
      const filteredGPTs = groupedGPTs[category].filter(gpt => {
        const name = gpt.name ? gpt.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
        const description = gpt.description ? gpt.description.toLowerCase().includes(searchQuery.toLowerCase()) : false;
        return name || description;
      });
      // Only add the category to the accumulator if there are GPTs after filtering
      if (filteredGPTs.length > 0) {
        acc[category] = filteredGPTs;
      }
      return acc;
    }, {}) : groupedGPTs;

    setFilteredGPTs(filtered);
  }, [searchQuery, groupedGPTs]);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4">
      <SubmitURLForm />
      <div className="my-4">
        <input
          type="search"
          placeholder="Search GPTs..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
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
      <CategoryFilter
        groupedGPTs={groupedGPTs}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {Object.keys(filteredGPTs).map((category) =>
        selectedCategory && category !== selectedCategory ? null : (
          filteredGPTs[category].length > 0 ? ( // Check if the category has GPTs
            <div key={category} className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                {category} ({filteredGPTs[category].length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGPTs[category].map((gpt) => (
                  <GPTCard key={gpt.id} gpt={gpt} />
                ))}
              </div>
            </div>
          ) : null  // If no GPTs, do not render the category
        )
      )}
    </div>
  );
}
