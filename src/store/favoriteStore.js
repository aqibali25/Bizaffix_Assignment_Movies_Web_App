import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoriteStore = create(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),
      removeFavorite: (imdbID) =>
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.imdbID !== imdbID),
        })),
    }),
    {
      name: "favorites-storage",
    },
  ),
);
