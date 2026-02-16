import React, { useContext } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { PokemonContext } from "../../context/PokemonContext";

const FavoritesScreen = () => {
  const { liked } = useContext(PokemonContext);

  return (
    <FlatList
      data={liked}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ alignItems: "center", margin: 10 }}>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
            }}
            style={{ width: 80, height: 80 }}
          />
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
};

export default FavoritesScreen;
