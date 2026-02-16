import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Pokemon } from "../../types/pokemon";
import TypeBadge from "./TypeBadge";
import ActionButtons from "./ActionButtons";

interface Props {
  pokemon: Pokemon;
  onLike: () => void;
  onDislike: () => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, onLike, onDislike }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>

      <View style={styles.types}>
        {pokemon.types.map((t, index) => (
          <TypeBadge key={index} label={t.type.name} />
        ))}
      </View>

      <ActionButtons onLike={onLike} onDislike={onDislike} />
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    margin: 20,
  },
  image: {
    height: 200,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  types: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
