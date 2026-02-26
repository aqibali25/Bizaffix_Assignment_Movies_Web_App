import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full opacity-20 blur-2xl" />
          <Film className="relative h-24 w-24 text-primary-600 dark:text-primary-400 mx-auto" />
        </div>

        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all"
        >
          <Home className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
