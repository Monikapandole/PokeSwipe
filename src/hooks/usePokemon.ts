import { useEffect, useState } from "react";
import { fetchPokemonById } from "../services/api";
import { Pokemon } from "../types/pokemon";

const getRandomId = () => Math.floor(Math.random() * 150) + 1;

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      const id = getRandomId();
      const data = await fetchPokemonById(id);
      setPokemon(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return { pokemon, loading, loadPokemon };
};
