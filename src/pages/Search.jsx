import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Filter, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import MovieCard from "../components/Movies/MovieCard";
import MovieCardSkeleton from "../components/Movies/MovieCardSkeleton";
import { searchMovies } from "../api/omdb";
import debounce from "lodash/debounce";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'

  const fetchMovies = async (query) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(query);
      setMovies(data.Search || []);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((query) => fetchMovies(query), 500),
    [],
  );

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchTerm(query);
      fetchMovies(query);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchParams({ q: value });
    debouncedFetch(value);
  };

  const sortMovies = (moviesToSort) => {
    return [...moviesToSort].sort((a, b) => {
      const yearA = parseInt(a.Year);
      const yearB = parseInt(b.Year);
      return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
    });
  };

  const sortedMovies = sortMovies(movies);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search for movies..."
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all outline-none"
            />
          </div>

          {/* Sort Controls */}
          {movies.length > 0 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowUpDown className="h-4 w-4" />
                <span>
                  Sort by Year:{" "}
                  {sortOrder === "asc" ? "Oldest first" : "Newest first"}
                </span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Results */}
        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-8 rounded-2xl text-center"
          >
            <p className="text-lg">{error}</p>
          </motion.div>
        ) : (
          <>
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                  <MovieCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                {sortedMovies.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  >
                    {sortedMovies.map((movie) => (
                      <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                  </motion.div>
                ) : (
                  searchTerm && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-16"
                    >
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto">
                        <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          No movies found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          We couldn't find any movies matching "{searchTerm}"
                        </p>
                      </div>
                    </motion.div>
                  )
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
