import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { logout } from './services/authService';
import { addFavorite, removeFavorite, onFavoritesChange } from './services/favoritesService';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Favorites from './components/Favorites';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('search');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Subscribe to favorites when user changes
  useEffect(() => {
    if (user) {
      const unsubscribe = onFavoritesChange(user.uid, setFavorites);
      return unsubscribe;
    } else {
      setFavorites([]);
    }
  }, [user]);

  const handleAddFavorite = async (item) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    const isFav = favorites.some(fav => fav.imdbID === item.imdbID);

    try {
      if (isFav) {
        await removeFavorite(user.uid, item.imdbID);
      } else {
        await addFavorite(user.uid, item);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleRemoveFavorite = async (item) => {
    if (user) {
      try {
        await removeFavorite(user.uid, item.imdbID);
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentTab('search');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-blue-400 text-4xl mb-4">⏳</div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header - Mobile-First */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-400">🎬 Box Office</h1>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Search movies and actors, save your favorites
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {user ? (
                <>
                  <span className="text-sm sm:text-base text-gray-300 truncate">
                    {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm sm:text-base font-semibold transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm sm:text-base font-semibold transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm sm:text-base font-semibold transition"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs - Mobile-First */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-16 sm:top-20 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto">
            <button
              onClick={() => setCurrentTab('search')}
              className={`px-4 py-3 font-semibold transition border-b-2 text-sm sm:text-base whitespace-nowrap ${
                currentTab === 'search'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Search
            </button>
            <button
              onClick={() => setCurrentTab('favorites')}
              className={`px-4 py-3 font-semibold transition border-b-2 relative text-sm sm:text-base whitespace-nowrap ${
                currentTab === 'favorites'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              ❤️ Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length > 99 ? '99+' : favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile-First */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {currentTab === 'search' ? (
          <div>
            <SearchBar onResults={setResults} onLoading={setLoading} />
            
            {loading && (
              <div className="flex justify-center py-8 sm:py-12">
                <div className="text-center">
                  <div className="animate-spin text-blue-400 text-3xl sm:text-4xl">⏳</div>
                  <p className="text-gray-400 mt-2 text-sm sm:text-base">Loading...</p>
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
            isLoggedIn={!!user}
          />
        )}
      </main>

      {/* Footer - Mobile-First */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-8 sm:mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-400 text-xs sm:text-sm">
          <p>
            Data provided by{' '}
            <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              OMDb API
            </a>
          </p>
          <p className="mt-2">© 2025 Box Office. All rights reserved.</p>
        </div>
      </footer>

      {/* Auth Modals */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </div>
  );
}