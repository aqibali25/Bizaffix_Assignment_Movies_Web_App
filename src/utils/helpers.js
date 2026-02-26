export const formatYear = (year) => {
  if (!year) return "N/A";
  return year.toString();
};

export const formatRuntime = (minutes) => {
  if (!minutes || minutes === "N/A") return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const getRatingColor = (rating) => {
  const numRating = parseFloat(rating);
  if (numRating >= 8) return "text-green-600";
  if (numRating >= 6) return "text-yellow-600";
  return "text-red-600";
};

export const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};
