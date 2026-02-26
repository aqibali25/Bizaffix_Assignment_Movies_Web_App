import { motion } from "framer-motion";

const MovieCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="aspect-[2/3] skeleton" />
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="h-5 w-3/4 skeleton rounded mb-2" />
        <div className="h-4 w-1/4 skeleton rounded" />
      </div>
    </motion.div>
  );
};

export default MovieCardSkeleton;
