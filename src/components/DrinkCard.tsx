import type {Drink} from '../types';
import {useAppStore} from '../stores/useAppStore';

type DrinkCardProps = {
	drink: Drink;
};

export default function DrinkCard({drink}: DrinkCardProps) {
	const {selectRecipe} = useAppStore();

	return (
		<div className='border shadow-lg'>
			<figure className='overflow-hidden'>
				<img
					loading='lazy'
					src={drink.strDrinkThumb}
					alt={`${drink.strDrink} image`}
					className='aspect-ratioxl hover:scale-125 transition-transform hover:rotate-2'
				/>
			</figure>

			<div className='p-5'>
				<h2 className='text-2xl truncate font-black'>{drink.strDrink}</h2>
				<button
					type='button'
					className='bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg'
					onClick={() => selectRecipe(drink.idDrink)}
				>
					Ver Receta
				</button>
			</div>
		</div>
	);
}
