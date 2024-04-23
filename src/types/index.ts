import {z} from 'zod';
import {
	CategoriesAPIResponseSchema,
	DrinkSchema,
	SearchFilterSchema,
	RecipeDetailsSchema,
} from '../schemas/recipes-schema';

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Drink = z.infer<typeof DrinkSchema>;
export type RecipeDetail = z.infer<typeof RecipeDetailsSchema>;
