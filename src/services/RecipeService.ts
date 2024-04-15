import axios from "axios";
import {
  CategoriesAPIResponseSchema,
  DriksAPIResponseSchema,
  RecipeAPIResponseSchema,
} from "../schemas/recipes-schema";
import type { Drink, SearchFilter } from "../types";

export async function getCategories() {
  try {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

    const { data } = await axios(url);
    const result = CategoriesAPIResponseSchema.safeParse(data);

    if (!result.success) {
      throw new Error("data is not of type CategoriesAPIResponseSchema");
    }
    return result.data;
  } catch (error) {
    console.error(error);
    return { drinks: [] };
  }
}

export async function getRecipes(filters: SearchFilter) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;
    const { data } = await axios(url);
    const result = DriksAPIResponseSchema.safeParse(data);

    if (!result.success) {
      throw new Error("data is not of type DriksAPIResponseSchema");
    }

    if (!result.data || !result.data.drinks.length) {
      throw new Error("No drinks available");
    }

    return result.data;
  } catch (error) {
    console.error(error);
    return { drinks: [] };
  }
}

export async function getRecipeDetails(id: Drink["idDrink"]) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    const { data } = await axios(url);
    const result = RecipeAPIResponseSchema.safeParse(data);

    if (!result.success) {
      throw new Error("data is not of type RecipeAPIResponseSchema");
    }

    if (!result.data.drinks.length) {
      throw new Error("No recipe available");
    }

    return result.data;
  } catch (error) {
    console.error(error);
    return { drinks: [] };
  }
}
