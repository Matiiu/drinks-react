import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipeDetails,
  getRecipes,
} from "../services/RecipeService";
import type { Categories, Drink, RecipeDetail, SearchFilter } from "../types";

export type RecipeSliceType = {
  categories: Categories;
  drinks: Drink[];
  recipeDetails: RecipeDetail[];
  dialogModal: boolean;
  fetchCateogries: () => Promise<void>;
  searchRecipes: (filters: SearchFilter) => Promise<void>;
  selectRecipie: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: [],
  recipeDetails: [],
  dialogModal: false,
  fetchCateogries: async () => {
    const categories = await getCategories();

    if (categories.drinks.length > 0) {
      // Ordenamos de manera ascendente las bebidas
      const categoriesAsc = categories.drinks.sort((a, b) =>
        a.strCategory.localeCompare(b.strCategory)
      );
      categories.drinks = [...categoriesAsc];
    }

    set({ categories });
  },
  searchRecipes: async (filters) => {
    const result = await getRecipes(filters);
    set({ drinks: result.drinks });
  },
  selectRecipie: async (id) => {
    const datail = await getRecipeDetails(id);
    set({
      recipeDetails: datail.drinks,
      dialogModal: true,
    });
  },
  closeModal: () => {
    set({
      dialogModal: false,
      recipeDetails: [],
    });
  },
});
