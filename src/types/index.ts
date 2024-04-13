import { z } from "zod";
import { CategoriesAPIResponseSchema, DrikSchema, SearchFilterSchema } from "../schemas/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Drink = z.infer<typeof DrikSchema>;
