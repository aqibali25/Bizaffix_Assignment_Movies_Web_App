import { Star } from "lucide-react";

const RatingBadge = ({ rating, className = "" }) => {
  if (!rating || rating === "N/A") return null;

  const numRating = parseFloat(rating);
  let bgColor = "bg-gray-500";

  if (numRating >= 8) bgColor = "bg-green-500";
  else if (numRating >= 6) bgColor = "bg-yellow-500";
  else if (numRating >= 4) bgColor = "bg-orange-500";
  else bgColor = "bg-red-500";

  return (
    <div
      className={`inline-flex items-center space-x-1 ${bgColor} text-white px-2 py-1 rounded-lg text-sm font-bold shadow-lg ${className}`}
    >
      <Star className="h-3 w-3 fill-current" />
      <span>{rating}</span>
    </div>
  );
};

export default RatingBadge;
