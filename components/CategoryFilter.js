const CategoryFilter = ({ groupedGPTs, selectedCategory, onSelectCategory }) => {
  return (
    <div className="my-4">
      <label htmlFor="category-select" className="block text-lg font-medium text-gray-700">Categories</label>
      <select
        id="category-select"
        onChange={(e) => onSelectCategory(e.target.value)}
        value={selectedCategory || ''}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="">All Categories</option>
        {Object.keys(groupedGPTs).map((category) => (
          <option key={category} value={category}>
            {category} ({groupedGPTs[category].length})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
