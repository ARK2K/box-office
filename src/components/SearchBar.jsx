import { useState } from 'react';
import { searchAll } from '../services/omdbService';

export default function SearchBar({ onResults, onLoading }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (searchTerm.trim().length < 2) {
      alert('Please enter at least 2 characters');
      return;
    }

    onLoading(true);
    const data = await searchAll(searchTerm);
    onResults(data.Search || []);
    onLoading(false);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6 md:mb-8">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies, shows, or actors..."
          className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-base"
        />
        <button 
          type="submit" 
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 font-semibold"
        >
          Search
        </button>
      </div>
    </form>
  );
}