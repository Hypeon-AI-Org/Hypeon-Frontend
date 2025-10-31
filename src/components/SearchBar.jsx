import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ selectedCategory, setSelectedCategory, selectedMarket, setSelectedMarket, onSearch, categories, markets }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="flex-1 px-4 py-3 bg-purple-900/50 border border-pink-700/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
      >
        <option value="">Find your niche-product categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedMarket}
        onChange={(e) => setSelectedMarket(e.target.value)}
        className="flex-1 px-4 py-3 bg-purple-900/50 border border-pink-700/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
      >
        <option value="">Choose your market</option>
        {markets.map((market) => (
          <option key={market} value={market}>
            {market}
          </option>
        ))}
      </select>

      <button
        onClick={onSearch}
        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 whitespace-nowrap"
      >
        <Search size={20} />
        <span>Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
