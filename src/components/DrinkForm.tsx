import { ChangeEvent, FormEvent, useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import { SearchFilter } from "../types";

export default function DrinkForm() {
  const { categories, searchRecipes, showNotification } = useAppStore();
  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
    ingredient: "",
    category: "",
  });

  type HandleChange = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

  const handleChange = (e: HandleChange) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar si algún campo está vacío
    if (Object.values(searchFilters).some((value) => !value)) {
      showNotification({
        text: "Todos los campos son obligatorios",
        isError: true,
      });
      return;
    }
    searchRecipes(searchFilters);
  };

  return (
    <form
      className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <label
          className="block text-white uppercase font-extrabold text-lg"
          htmlFor="ingredient"
        >
          Nombre o Ingredientes
        </label>

        <input
          id="ingredient"
          name="ingredient"
          type="text"
          className="p-3 w-full rounded-lg focus:outline-none"
          placeholder="Nombre o Ingrediente EJ. Vodka, Tequila, Café."
          onChange={handleChange}
          value={searchFilters.ingredient}
        />
      </div>

      <div className="space-y-4">
        <label
          className="block text-white uppercase font-extrabold text-lg"
          htmlFor="category"
        >
          Categoría
        </label>

        <select
          id="category"
          name="category"
          className="p-3 w-full rounded-lg focus:outline-none"
          onChange={handleChange}
          value={searchFilters.category}
        >
          <option value="">-- Seleccione --</option>
          {categories.drinks.map(({ strCategory }) => (
            <option key={strCategory} value={strCategory}>
              {strCategory}
            </option>
          ))}
        </select>
      </div>

      <input
        type="submit"
        value="Buscar Recetas"
        className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
      />
    </form>
  );
}
