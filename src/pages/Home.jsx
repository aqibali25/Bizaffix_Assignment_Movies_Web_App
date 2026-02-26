import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  TrendingUp,
  Film,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  Clock,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "../components/movies/MovieCard";
import MovieCardSkeleton from "../components/movies/MovieCardSkeleton";
import { searchMovies } from "../api/omdb";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [trending, setTrending] = useState([]);
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState({
    trending: true,
    discover: true,
    popular: true,
  });
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const sliderMovies = [
    {
      id: "marvel",
      title: "Marvel Cinematic Universe",
      description: "Experience the epic saga of the Avengers and beyond",
      image:
        "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-red-600/90 to-purple-900/90",
      query: "marvel",
    },
    {
      id: "starwars",
      title: "Star Wars Saga",
      description: "A long time ago in a galaxy far, far away...",
      image:
        "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-yellow-600/90 to-black/90",
      query: "star wars",
    },
    {
      id: "harrypotter",
      title: "Wizarding World",
      description: "Discover the magic of Harry Potter and Fantastic Beasts",
      image:
        "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      gradient: "from-amber-600/90 to-indigo-900/90",
      query: "harry potter",
    },
    {
      id: "lotr",
      title: "Middle-earth Adventures",
      description: "The Lord of the Rings and The Hobbit trilogies",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-green-700/90 to-amber-800/90",
      query: "lord of the rings",
    },
  ];

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        // Fetch trending (popular searches)
        const popularSearches = [
          "marvel",
          "star wars",
          "harry potter",
          "lord of the rings",
          "inception",
          "matrix",
          "avatar",
          "batman",
        ];
        const randomSearch =
          popularSearches[Math.floor(Math.random() * popularSearches.length)];
        const trendingData = await searchMovies(randomSearch);
        setTrending(trendingData.Search?.slice(0, 8) || []);
        setLoading((prev) => ({ ...prev, trending: false }));

        // Fetch discover movies (latest releases)
        const discoverQueries = [
          "2024",
          "2023",
          "action",
          "comedy",
          "drama",
          "sci-fi",
        ];
        const discoverPromises = discoverQueries.map((query) =>
          searchMovies(query),
        );
        const discoverResults = await Promise.all(discoverPromises);
        const allDiscoverMovies = discoverResults
          .flatMap((result) => result.Search || [])
          .filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.imdbID === movie.imdbID),
          )
          .slice(0, 20);
        setDiscoverMovies(allDiscoverMovies);
        setLoading((prev) => ({ ...prev, discover: false }));

        // Fetch popular movies (highly rated)
        const popularQueries = [
          "avengers",
          "dark knight",
          "inception",
          "interstellar",
          "godfather",
          "pulp fiction",
          "goodfellas",
          "shawshank",
        ];
        const popularPromises = popularQueries.map((query) =>
          searchMovies(query),
        );
        const popularResults = await Promise.all(popularPromises);
        const allPopularMovies = popularResults
          .flatMap((result) => result.Search || [])
          .filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.imdbID === movie.imdbID),
          )
          .slice(0, 20);
        setPopularMovies(allPopularMovies);
        setLoading((prev) => ({ ...prev, popular: false }));
      } catch (err) {
        setError("Failed to fetch movies");
        setLoading({ trending: false, discover: false, popular: false });
      }
    };

    fetchAllMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSliderClick = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderMovies.length) % sliderMovies.length,
    );
  };

  const showMoreMovies = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const showLessMovies = () => {
    setVisibleCount(12);
    // Scroll back to top of section
    const element = document.getElementById("discover-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Slider Section */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0">
              <img
                src={sliderMovies[currentSlide].image}
                alt={sliderMovies[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${sliderMovies[currentSlide].gradient}`}
              />
            </div>

            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Featured Collection
                  </span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                  {sliderMovies[currentSlide].title}
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  {sliderMovies[currentSlide].description}
                </p>

                <button
                  onClick={() =>
                    handleSliderClick(sliderMovies[currentSlide].query)
                  }
                  className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold overflow-hidden shadow-2xl hover:shadow-white/30 transition-shadow"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center space-x-2 group-hover:text-white">
                    <Eye className="h-5 w-5" />
                    <span>Explore Collection</span>
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {sliderMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <div className="relative -mt-16 z-20 max-w-3xl mx-auto px-4">
        <motion.form
          onSubmit={handleSearch}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative group"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies..."
            className="w-full px-6 py-5 pl-16 pr-36 text-lg rounded-full border-2 border-white/50 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all outline-none shadow-xl"
          />
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all"
          >
            Search
          </button>
        </motion.form>
      </div>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Trending Now
            </h2>
          </div>
        </motion.div>

        {loading.trending ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {trending.map((movie, index) => (
              <motion.div
                key={movie.imdbID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Discover Movies Section */}
      <section
        id="discover-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-transparent via-primary-50/30 to-transparent dark:via-gray-800/30"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <Film className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Discover Movies
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            {visibleCount > 12 && (
              <button
                onClick={showLessMovies}
                className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Show Less
              </button>
            )}
            {visibleCount < discoverMovies.length && (
              <button
                onClick={showMoreMovies}
                className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Show More
              </button>
            )}
          </div>
        </motion.div>

        {loading.discover ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {discoverMovies.slice(0, visibleCount).map((movie, index) => (
                <motion.div
                  key={movie.imdbID}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>

            {/* Show More/Less Buttons for Mobile */}
            <div className="flex justify-center mt-8 space-x-4 lg:hidden">
              {visibleCount > 12 && (
                <button
                  onClick={showLessMovies}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Show Less
                </button>
              )}
              {visibleCount < discoverMovies.length && (
                <button
                  onClick={showMoreMovies}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all"
                >
                  Show More ({discoverMovies.length - visibleCount} remaining)
                </button>
              )}
            </div>

            {/* Results Count */}
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              Showing {Math.min(visibleCount, discoverMovies.length)} of{" "}
              {discoverMovies.length} movies
            </p>
          </>
        )}
      </section>

      {/* Popular Movies Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
            <Star className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Popular Picks
          </h2>
        </motion.div>

        {loading.popular ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularMovies.slice(0, 10).map((movie, index) => (
              <motion.div
                key={movie.imdbID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/search?q=popular")}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <span>View All Popular Movies</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
