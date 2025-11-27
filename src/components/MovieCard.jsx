export default function MovieCard({ movie, onAddFavorite, isFavorite }) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-3 sm:p-4 transition hover:shadow-xl">
      <div className="relative mb-3 sm:mb-4">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-48 sm:h-64 object-cover rounded"
          />
        ) : (
          <div className="w-full h-48 sm:h-64 bg-gray-800 flex items-center justify-center rounded">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        <button
          onClick={() => onAddFavorite(movie)}
          className={`absolute top-2 right-2 p-2 rounded-full transition text-lg sm:text-xl ${
            isFavorite
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          ❤️
        </button>
      </div>
      <h3 className="text-base sm:text-lg font-semibold truncate text-white">{movie.Title}</h3>
      <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">{movie.Year}</p>
      <p className="text-gray-300 text-xs sm:text-sm mb-2">
        {movie.Type === 'movie' ? '🎬 Movie' : '📺 Show'}
      </p>
      {movie.imdbID && (
        <a
          href={`https://www.imdb.com/title/${movie.imdbID}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm inline-block"
        >
          View on IMDb ↗
        </a>
      )}
    </div>
  );
}