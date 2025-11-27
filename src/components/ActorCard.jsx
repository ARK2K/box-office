export default function ActorCard({ actor, onAddFavorite, isFavorite }) {
  const handleFavorite = () => {
    onAddFavorite(actor);
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-4 transition hover:shadow-xl">
      <div className="relative mb-4">
        {actor.Poster && actor.Poster !== 'N/A' ? (
          <img
            src={actor.Poster}
            alt={actor.Title}
            className="w-full h-64 object-cover rounded"
          />
        ) : (
          <div className="w-full h-64 bg-gray-800 flex items-center justify-center rounded">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        <button
          onClick={handleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full transition ${
            isFavorite
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          ⭐
        </button>
      </div>
      <h3 className="text-lg font-semibold truncate">{actor.Title}</h3>
      <p className="text-gray-400 text-sm mb-2">{actor.Type}</p>
      {actor.imdbID && (
        <a
          href={`https://www.imdb.com/name/${actor.imdbID}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
        >
          View on IMDb ↗
        </a>
      )}
    </div>
  );
}