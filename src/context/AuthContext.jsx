import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (foundUser) {
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          avatar: foundUser.avatar || null,
          provider: "email",
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
        return { success: true };
      } else {
        return { success: false, error: "Invalid email or password" };
      }
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.some((u) => u.email === email)) {
        return { success: false, error: "User already exists" };
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&bold=true`,
        provider: "email",
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      const userData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
        provider: "email",
        createdAt: newUser.createdAt,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/");
      return { success: true };
    } catch (error) {
      return { success: false, error: "Signup failed" };
    }
  };

  const googleLogin = async () => {
    try {
      const mockGoogleUser = {
        id: "google_" + Date.now().toString(),
        name: "Google User",
        email: "user@gmail.com",
        avatar:
          "https://ui-avatars.com/api/?name=Google+User&background=ea4335&color=fff&bold=true",
        provider: "google",
        createdAt: new Date().toISOString(),
      };

      // Store in users list
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((u) => u.email === mockGoogleUser.email);

      if (!existingUser) {
        users.push(mockGoogleUser);
        localStorage.setItem("users", JSON.stringify(users));
      }

      const userData = existingUser || mockGoogleUser;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/");
      return { success: true };
    } catch (error) {
      return { success: false, error: "Google login failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const updateProfile = async (name, email, avatar) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((u) => u.id === user.id);

      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          name,
          email,
          avatar: avatar || users[userIndex].avatar,
        };
        localStorage.setItem("users", JSON.stringify(users));

        const updatedUser = {
          ...user,
          name,
          email,
          avatar: avatar || user.avatar,
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        return { success: true };
      }
      return { success: false, error: "User not found" };
    } catch (error) {
      return { success: false, error: "Update failed" };
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    googleLogin,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
