import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, Star, Calendar, Clock, Film, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useFavoriteStore } from "../store/favoriteStore";
import { getMovieDetails } from "../api/omdb";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const isFavorite = favorites.some((fav) => fav.imdbID === movie?.imdbID);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="skeleton h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-8 rounded-2xl">
            <p className="text-lg">{error || "Movie not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Background Banner */}
      <div
        className="absolute inset-0 h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : ""})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900 dark:to-gray-900 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row gap-8 items-start"
        >
          {/* Poster */}
          <div className="lg:w-1/3">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/500x750?text=No+Poster"
                }
                alt={movie.Title}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:w-2/3 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {movie.Title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">{movie.imdbRating}</span>
                <span className="text-sm">/10</span>
              </div>

              <div className="flex items-center space-x-1 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <Calendar className="h-4 w-4" />
                <span>{movie.Year}</span>
              </div>

              <div className="flex items-center space-x-1 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <Clock className="h-4 w-4" />
                <span>{movie.Runtime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.Genre?.split(", ").map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-primary-600/80 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              {movie.Plot}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Film className="h-4 w-4" />
                  <span className="text-sm">Director</span>
                </div>
                <p className="font-medium">{movie.Director}</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Award className="h-4 w-4" />
                  <span className="text-sm">Awards</span>
                </div>
                <p className="font-medium">{movie.Awards || "N/A"}</p>
              </div>
            </div>

            <button
              onClick={toggleFavorite}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                isFavorite
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              }`}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
              />
              <span>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MovieDetails;
