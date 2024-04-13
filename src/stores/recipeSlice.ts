import { StateCreator } from "zustand";
import { getCategories, getRecipes } from "../services/RecipeService";
import type { Categories, Drink, SearchFilter } from "../types";

export type RecipeSliceType = {
  categories: Categories;
  drinks: Drink[];
  fetchCateogries: () => Promise<void>;
  searchRecipes: (filters: SearchFilter) => Promise<void>;
};

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: [],
  fetchCateogries: async () => {
    const categories = await getCategories();

    if (categories?.drinks && !!categories.drinks.length) {
      // Ordenamos de manera ascendente las bebidas
      const categoriesAsc = categories.drinks.sort((a, b) =>
        a.strCategory.localeCompare(b.strCategory)
      );
      categories.drinks = [...categoriesAsc];
    }

    set({
      categories,
    });
  },
  searchRecipes: async (filters) => {
    const result = await getRecipes(filters);
    const drinks = result?.drinks ?? [];
    set({ drinks });
  },
});
