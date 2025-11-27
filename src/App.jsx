import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Favorites from './components/Favorites';

export default function App() {
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('search');

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddFavorite = (item) => {
    const isFavorite = favorites.some(fav => fav.imdbID === item.imdbID);
    
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.imdbID !== item.imdbID));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const handleRemoveFavorite = (item) => {
    setFavorites(favorites.filter(fav => fav.imdbID !== item.imdbID));
  };

  const handleSearch = (searchResults) => {
    setResults(searchResults);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-400">🎬 MovieSearch</h1>
          <p className="text-gray-400 text-sm mt-1">Search movies and actors, save your favorites</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentTab('search')}
              className={`px-4 py-3 font-semibold transition border-b-2 ${
                currentTab === 'search'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Search
            </button>
            <button
              onClick={() => setCurrentTab('favorites')}
              className={`px-4 py-3 font-semibold transition border-b-2 relative ${
                currentTab === 'favorites'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              ❤️ Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentTab === 'search' ? (
          <div>
            <SearchBar onResults={handleSearch} onLoading={setLoading} />
            
            {loading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin">
                  <div className="text-blue-400 text-2xl">⏳ Loading...</div>
                </div>
              </div>
            )}
            
            {!loading && (
              <ResultsList
                results={results}
                favorites={favorites}
                onAddFavorite={handleAddFavorite}
              />
            )}
          </div>
        ) : (
          <Favorites
            favorites={favorites}
            onRemoveFavorite={handleRemoveFavorite}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
          <p>Data provided by <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">OMDb API</a></p>
          <p className="mt-2">© 2024 MovieSearch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}