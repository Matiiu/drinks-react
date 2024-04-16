import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice";
import { createFavoritesSlice, FavoritesSliceType } from "./favoritesSlice";
import {
  createNofiticationSlice,
  NofiticationSliceType,
} from "./notificationSlice";

type AppStoreType = RecipeSliceType &
  FavoritesSliceType &
  NofiticationSliceType;

export const useAppStore = create<AppStoreType>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNofiticationSlice(...a),
  }))
);
