import { Pokemon } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon");
  }

  return response.json();
};
