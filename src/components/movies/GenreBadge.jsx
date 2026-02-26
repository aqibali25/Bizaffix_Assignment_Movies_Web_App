const GenreBadge = ({ genre }) => {
  const colors = {
    Action: "bg-red-500",
    Adventure: "bg-orange-500",
    Comedy: "bg-yellow-500",
    Drama: "bg-purple-500",
    Horror: "bg-pink-500",
    Romance: "bg-rose-500",
    "Sci-Fi": "bg-cyan-500",
    Thriller: "bg-indigo-500",
    default: "bg-primary-500",
  };

  const color = colors[genre] || colors.default;

  return (
    <span
      className={`${color} text-white px-3 py-1 rounded-full text-sm font-medium`}
    >
      {genre}
    </span>
  );
};

export default GenreBadge;
