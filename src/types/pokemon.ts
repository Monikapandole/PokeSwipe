export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
}
