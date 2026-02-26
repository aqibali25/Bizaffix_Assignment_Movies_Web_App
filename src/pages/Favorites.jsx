import { useState } from "react";
import { Heart, Bookmark, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavoriteStore } from "../store/favoriteStore";
import MovieCard from "../components/Movies/MovieCard";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavoriteStore();
  const [hoveredId, setHoveredId] = useState(null);

  const handleRemove = (imdbID) => {
    removeFavorite(imdbID);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 gradient-bg rounded-3xl opacity-10 blur-3xl" />
          <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="p-3 gradient-bg rounded-2xl">
                <Bookmark className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  My Watchlist
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  You have {favorites.length}{" "}
                  {favorites.length === 1 ? "movie" : "movies"} in your
                  collection
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <AnimatePresence>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favorites.map((movie, index) => (
                <motion.div
                  key={movie.imdbID}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  onHoverStart={() => setHoveredId(movie.imdbID)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="relative group"
                >
                  <MovieCard movie={movie} />

                  {/* Quick Remove Button */}
                  <AnimatePresence>
                    {hoveredId === movie.imdbID && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => handleRemove(movie.imdbID)}
                        className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors z-20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 gradient-bg rounded-full opacity-20 blur-2xl" />
              <Heart className="relative h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your watchlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Start adding movies to your watchlist by clicking the heart icon
              on any movie you love!
            </p>
            <a
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 gradient-bg text-white rounded-full font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              <span>Discover Movies</span>
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
