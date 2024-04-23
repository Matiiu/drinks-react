import {StateCreator} from 'zustand';
import type {RecipeDetail} from '../types';
import {createNotificationSlice} from './notificationSlice';
import {NotificationSliceType} from './notificationSlice';

export type FavoritesSliceType = {
	favorites: RecipeDetail[];
	addToFavorite: (recipe: RecipeDetail) => void;
	favoriteExists: (id: RecipeDetail['idDrink']) => boolean;
};

const initialFavorites = (): RecipeDetail[] => {
	const favorites = localStorage.getItem('favorites');
	return favorites ? JSON.parse(favorites) : [];
};

type CreateFavoritesSliceType = StateCreator<
	FavoritesSliceType & NotificationSliceType,
	[],
	[],
	FavoritesSliceType
>;

export const createFavoritesSlice: CreateFavoritesSliceType = (set, get, api) => ({
	favorites: initialFavorites(),
	addToFavorite: (recipe) => {
		// Validar si ya existe el ingrediente en nuestros array de favoritos
		if (get().favoriteExists(recipe.idDrink)) {
			// Si ya existe lo eliminamos
			set((state) => ({
				favorites: state.favorites.filter(
					({idDrink}) => idDrink !== recipe.idDrink,
				),
			}));

			createNotificationSlice(set, get, api).showNotification({
				text: `Se eliminó ${recipe.strDrink} de favoritos`,
				isError: true,
				timeOut: 5000,
			});
		} else {
			// Si no existe lo agregamos
			set((state) => ({
				favorites: [...state.favorites, recipe],
			}));

			createNotificationSlice(set, get, api).showNotification({
				text: `Se agrego ${recipe.strDrink} a favoritos`,
			});
		}
		// Add to storage
		localStorage.setItem('favorites', JSON.stringify(get().favorites));
	},
	favoriteExists: (id) => get().favorites.some(({idDrink}) => idDrink === id),
});
