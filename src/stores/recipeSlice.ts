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
  loading: boolean;
  fetchCateogries: () => Promise<void>;
  searchRecipes: (filters: SearchFilter) => Promise<void>;
  selectRecipie: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
  handleLoading: (isLoading: boolean) => void;
};

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set, get) => ({
  categories: {
    drinks: [],
  },
  drinks: [],
  recipeDetails: [],
  dialogModal: false,
  loading: false,
  fetchCateogries: async () => {
    get().handleLoading(true);
    const categories = await getCategories();

    if (categories.drinks.length > 0) {
      // Ordenamos de manera ascendente las bebidas
      const categoriesAsc = categories.drinks.sort((a, b) =>
        a.strCategory.localeCompare(b.strCategory)
      );
      categories.drinks = [...categoriesAsc];
    }
    set({ categories });
    get().handleLoading(false);
  },
  searchRecipes: async (filters) => {
    get().handleLoading(true);
    const result = await getRecipes(filters);
    set({ drinks: result.drinks });
    get().handleLoading(false);
  },
  selectRecipie: async (id) => {
    get().handleLoading(true);
    const datail = await getRecipeDetails(id);
    set({
      recipeDetails: datail.drinks,
      dialogModal: true,
    });
    get().handleLoading(false);
  },
  closeModal: () => {
    set({
      dialogModal: false,
      recipeDetails: [],
    });
  },
  handleLoading: (isLoading) => {
    set({
      loading: isLoading,
    });
  },
});
