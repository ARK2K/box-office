import MovieCard from './MovieCard';
import ActorCard from './ActorCard';

export default function ResultsList({ results, favorites, onAddFavorite }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          No results found. Try searching for a movie or actor.
        </p>
      </div>
    );
  }

  const isFavorite = (item) => {
    return favorites.some(fav => fav.imdbID === item.imdbID);
  };

  return (
    <div>
      <p className="text-gray-300 mb-4">Found {results.length} results</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {results.map((item) => 
          item.Type === 'movie' ? (
            <MovieCard
              key={item.imdbID}
              movie={item}
              onAddFavorite={onAddFavorite}
              isFavorite={isFavorite(item)}
            />
          ) : (
            <ActorCard
              key={item.imdbID}
              actor={item}
              onAddFavorite={onAddFavorite}
              isFavorite={isFavorite(item)}
            />
          )
        )}
      </div>
    </div>
  );
}