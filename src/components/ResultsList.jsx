import MovieCard from './MovieCard';
import ActorCard from './ActorCard';

export default function ResultsList({ results, favorites, onAddFavorite }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <p className="text-gray-400 text-base sm:text-lg">
          No results found. Try searching for a movie or actor.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-300 mb-4 text-sm sm:text-base">
        Found {results.length} result{results.length !== 1 ? 's' : ''}
      </p>
      {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3-4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {results.map((item) => 
          item.Type === 'movie' ? (
            <MovieCard
              key={item.imdbID}
              movie={item}
              onAddFavorite={onAddFavorite}
              isFavorite={favorites.some(fav => fav.imdbID === item.imdbID)}
            />
          ) : (
            <ActorCard
              key={item.imdbID}
              actor={item}
              onAddFavorite={onAddFavorite}
              isFavorite={favorites.some(fav => fav.imdbID === item.imdbID)}
            />
          )
        )}
      </div>
    </div>
  );
}