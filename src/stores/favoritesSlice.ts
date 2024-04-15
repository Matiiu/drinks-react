import { StateCreator } from "zustand";
import { RecipeDetail } from "../types";

export type FavoritesSliceType = {
  favorites: RecipeDetail[];
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = () => ({
  favorites: [],
});
