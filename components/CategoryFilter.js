import React from 'react';

const CategoryFilter = ({ groupedGPTs, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {Object.keys(groupedGPTs).map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
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
        onClick={() => onSelectCategory(null)}
        className="py-2 px-3 sm:px-4 text-sm sm:text-lg bg-red-200 text-red-600 hover:bg-red-500 hover:text-white rounded transition duration-300 ease-in-out"
      >
        Clear Filter
      </button>
    </div>
  );
};

export default CategoryFilter;
