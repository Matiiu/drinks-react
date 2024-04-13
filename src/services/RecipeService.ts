import axios from "axios";
import {
  CategoriesAPIResponseSchema,
  DriksAPIResponseSchema,
} from "../schemas/recipes-schema";
import type { SearchFilter } from "../types";

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
      throw new Error("No drinks available")
    }

    return result.data;
  } catch (error) {
    console.error(error);
  }
}
