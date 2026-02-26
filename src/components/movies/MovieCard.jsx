import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useFavoriteStore } from "../../store/favoriteStore";
import { motion } from "framer-motion";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const [isHovered, setIsHovered] = useState(false);
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  const rating = movie.imdbRating || (Math.random() * 4 + 6).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={`/movie/${movie.imdbID}`}>
        <div className="relative rounded-2xl overflow-hidden shadow-lg card-hover">
          <div className="aspect-[2/3] relative">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Poster"
              }
              alt={movie.Title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
            >
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm line-clamp-3">
                  {movie.Plot || "Click to view details"}
                </p>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-3 left-3 flex items-center space-x-1 bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-sm font-bold shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              <span>{rating}</span>
            </div>

            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all group/btn"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={`h-5 w-5 transition-all ${
                  isFavorite
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-white group-hover/btn:scale-110"
                }`}
              />
            </button>

            {/* Year Badge */}
            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {movie.Year}
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white truncate">
              {movie.Title}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {movie.Type?.charAt(0).toUpperCase() + movie.Type?.slice(1)}
              </p>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span>{rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
