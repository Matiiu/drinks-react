import { StateCreator } from "zustand";
import type { RecipeDetail } from "../types";

export type FavoritesSliceType = {
  favorites: RecipeDetail[];
  addToFavorite: (recipe: RecipeDetail) => void;
  favoriteExists: (id: RecipeDetail["idDrink"]) => boolean;
};

const initialFavorites = (): RecipeDetail[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: initialFavorites(),
  addToFavorite: (recipe) => {
    // Validar si ya existe el ingrediente en nuestros array de favoritos
    if (get().favoriteExists(recipe.idDrink)) {
      // Si ya existe lo eliminamos
      set((state) => ({
        favorites: state.favorites.filter(
          ({ idDrink }) => idDrink !== recipe.idDrink
        ),
      }));
    } else {
      // Si no existe lo agregamos
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
    }
    // Agregar al storage
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExists: (id) => {
    return get().favorites.some(({ idDrink }) => idDrink === id);
  },
});
