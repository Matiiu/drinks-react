import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {createRecipeSlice, RecipeSliceType} from './recipeSlice';
import {createFavoritesSlice, FavoritesSliceType} from './favoritesSlice';

import {createNotificationSlice, NotificationSliceType} from './notificationSlice';

type AppStoreType = RecipeSliceType & FavoritesSliceType & NotificationSliceType;

export const useAppStore = create<AppStoreType>()(
	devtools((...a) => ({
		...createRecipeSlice(...a),
		...createFavoritesSlice(...a),
		...createNotificationSlice(...a),
	}))
);
