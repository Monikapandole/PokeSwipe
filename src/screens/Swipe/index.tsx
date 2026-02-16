import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import SwipeableCard from "../../components/pokemon/SwipeableCard";
import { usePokemon } from "../../hooks/usePokemon";
import { PokemonContext } from "../../context/PokemonContext";

const SwipeScreen = () => {
  const { pokemon, loading, loadPokemon } = usePokemon();
  const { addToLiked } = useContext(PokemonContext);

  if (loading || !pokemon) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SwipeableCard
        pokemon={pokemon}
        onSwipeLeft={() => {
          loadPokemon();
        }}
        onSwipeRight={() => {
          addToLiked(pokemon);
          loadPokemon();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SwipeScreen;
