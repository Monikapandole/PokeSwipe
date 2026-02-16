import React, { createContext, useState } from "react";
import { Pokemon } from "../types/pokemon";

interface PokemonContextType {
  liked: Pokemon[];
  addToLiked: (pokemon: Pokemon) => void;
}

export const PokemonContext = createContext<PokemonContextType>(
  {} as PokemonContextType
);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [liked, setLiked] = useState<Pokemon[]>([]);

  const addToLiked = (pokemon: Pokemon) => {
    setLiked(prev => {
      if (prev.find(p => p.id === pokemon.id)) return prev;
      return [...prev, pokemon];
    });
  };

  return (
    <PokemonContext.Provider value={{ liked, addToLiked }}>
      {children}
    </PokemonContext.Provider>
  );
};
