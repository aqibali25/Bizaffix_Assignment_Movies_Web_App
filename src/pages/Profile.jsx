import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  LogOut,
  Edit2,
  Save,
  X,
  Heart,
  Film,
  Calendar,
  Award,
  Star,
  Clock,
  Settings,
  Camera,
  TrendingUp,
  Bookmark,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useFavoriteStore } from "../store/favoriteStore";

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const { favorites } = useFavoriteStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    logout();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await updateProfile(name, email, avatar);
    if (result.success) {
      setSuccess("Profile updated successfully");
      setTimeout(() => setSuccess(""), 3000);
      setIsEditing(false);
    } else {
      setError(result.error);
    }
  };

  const handleAvatarChange = () => {
    const newAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&bold=true&size=128`;
    setAvatar(newAvatar);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "activity", label: "Activity", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Cover Photo */}
            <div className="relative h-48 bg-gradient-to-r from-primary-600 via-primary-700 to-accent-700">
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              {/* Avatar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-20 mb-4">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-gradient-to-br from-primary-500 to-accent-500">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      onClick={handleAvatarChange}
                      className="absolute -bottom-2 -right-2 p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-white">
                        {user.name}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                        <Mail className="h-4 w-4 mr-2" />
                        {user.email}
                      </p>
                    </div>

                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span>Edit Profile</span>
                        </button>
                      ) : null}
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                      <Heart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Favorites
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {favorites.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent-100 dark:bg-accent-900/20 rounded-lg">
                      <Calendar className="h-5 w-5 text-accent-600 dark:text-accent-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Member Since
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {memberSince}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Account Type
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                        {user.provider || "Standard"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Form */}
              <AnimatePresence>
                {isEditing && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleUpdateProfile}
                    className="mt-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Edit2 className="h-5 w-5 mr-2 text-primary-600" />
                      Edit Profile Information
                    </h3>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    {success && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm"
                      >
                        {success}
                      </motion.div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary-500 dark:focus:border-primary-400 outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary-500 dark:focus:border-primary-400 outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-2">
                        <button
                          type="submit"
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="h-4 w-4" />
                          <span>Save Changes</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? "border-primary-600 text-primary-600 dark:text-primary-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary-600" />
                      Recent Activity
                    </h2>

                    {favorites.length > 0 ? (
                      <div className="space-y-4">
                        {favorites.slice(0, 5).map((movie, index) => (
                          <motion.div
                            key={movie.imdbID}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(`/movie/${movie.imdbID}`)}
                            className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                          >
                            <img
                              src={
                                movie.Poster !== "N/A"
                                  ? movie.Poster
                                  : "https://via.placeholder.com/50x75"
                              }
                              alt={movie.Title}
                              className="w-12 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {movie.Title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {movie.Year}
                              </p>
                            </div>
                            <Heart className="h-5 w-5 text-red-500 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          No favorites yet
                        </p>
                        <button
                          onClick={() => navigate("/search")}
                          className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Discover Movies
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats & Info */}
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Account Info
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          Member since
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {memberSince}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          Account type
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {user.provider || "Standard"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          Favorites
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {favorites.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl p-6 shadow-lg text-white">
                    <Bookmark className="h-8 w-8 mb-4 opacity-80" />
                    <h3 className="text-lg font-bold mb-2">
                      Movie Buff Status
                    </h3>
                    <p className="text-sm opacity-90 mb-4">
                      You've added {favorites.length} movies to your collection
                    </p>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all duration-500"
                        style={{
                          width: `${Math.min((favorites.length / 20) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs mt-2 opacity-75">
                      {favorites.length >= 20
                        ? "Master Collector!"
                        : `${20 - favorites.length} more to next level`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === "favorites" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Your Favorite Movies ({favorites.length})
                </h2>

                {favorites.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {favorites.map((movie, index) => (
                      <motion.div
                        key={movie.imdbID}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => navigate(`/movie/${movie.imdbID}`)}
                        className="cursor-pointer group"
                      >
                        <div className="relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all">
                          <img
                            src={
                              movie.Poster !== "N/A"
                                ? movie.Poster
                                : "https://via.placeholder.com/300x450"
                            }
                            alt={movie.Title}
                            className="w-full aspect-[2/3] object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <p className="text-white text-sm font-medium truncate">
                                {movie.Title}
                              </p>
                              <p className="text-white/80 text-xs">
                                {movie.Year}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No favorites yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Start adding movies to your collection
                    </p>
                    <button
                      onClick={() => navigate("/search")}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Browse Movies
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
                  Activity Timeline
                </h2>

                <div className="space-y-4">
                  {favorites.length > 0 ? (
                    favorites.slice(0, 10).map((movie, index) => (
                      <motion.div
                        key={movie.imdbID}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                          <Heart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white">
                            Added{" "}
                            <span className="font-semibold">{movie.Title}</span>{" "}
                            to favorites
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {movie.Year} • {movie.Type}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/movie/${movie.imdbID}`)}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-700"
                        >
                          View
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                      No activity yet
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary-600" />
                  Account Settings
                </h2>

                <div className="max-w-2xl space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Receive updates about new features and recommendations
                    </p>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 rounded"
                        defaultChecked
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Enable email notifications
                      </span>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Privacy
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Control who can see your favorites
                    </p>
                    <select className="w-full p-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                      <option>Public</option>
                      <option>Private</option>
                      <option>Friends Only</option>
                    </select>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Permanently delete your account and all data
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;
