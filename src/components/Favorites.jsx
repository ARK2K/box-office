import MovieCard from './MovieCard';
import ActorCard from './ActorCard';

export default function Favorites({ favorites, onRemoveFavorite }) {
  const handleRemove = (item) => {
    onRemoveFavorite(item);
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          No favorites saved yet. Start by searching and adding items!
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-300 mb-4">
        {favorites.length} item{favorites.length !== 1 ? 's' : ''} saved
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favorites.map((item) =>
          item.Type === 'movie' ? (
            <MovieCard
              key={item.imdbID}
              movie={item}
              onAddFavorite={handleRemove}
              isFavorite={true}
            />
          ) : (
            <ActorCard
              key={item.imdbID}
              actor={item}
              onAddFavorite={handleRemove}
              isFavorite={true}
            />
          )
        )}
      </div>
    </div>
  );
}