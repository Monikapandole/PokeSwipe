import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { Pokemon, getTypeColor } from "../../types/pokemon";
import { PokemonContext } from "../../context/PokemonContext";

const FavoritesScreen = () => {
  const { liked } = useContext(PokemonContext);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePokemonPress = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPokemon(null);
  };

  // Format height (decimeters to cm)
  const formatHeight = (height: number) => height * 10;
  
  // Format weight (hectograms to kg)
  const formatWeight = (weight: number) => weight / 10;
  
  // Get abilities
  const getAbilities = (pokemon: Pokemon) => {
    return pokemon.abilities
      .map(a => a.ability.name.replace(/-/g, " "))
      .join(", ");
  };

  // Get all stats
  const getAllStats = (pokemon: Pokemon) => {
    return pokemon.stats.map(stat => ({
      name: stat.stat.name.replace(/-/g, " "),
      value: stat.base_stat,
    }));
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>💔</Text>
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start swiping to add Pokémon to your favorites!
      </Text>
    </View>
  );

  const renderPokemonModal = () => {
    if (!selectedPokemon) return null;

    const primaryType = selectedPokemon.types[0]?.type.name || "normal";
    const typeColor = getTypeColor(primaryType);
    const stats = getAllStats(selectedPokemon);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={closeModal} />
          <View style={styles.modalContent}>
            {/* Header with close button */}
            <View style={[styles.modalHeader, { backgroundColor: typeColor }]}>
              <Text style={styles.modalHeaderText}>
                #{selectedPokemon.id.toString().padStart(3, "0")} {" "}
                {selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Pokemon Image */}
              <View style={styles.modalImageContainer}>
                <Image
                  source={{
                    uri: selectedPokemon.sprites?.other?.["official-artwork"]?.front_default ||
                         `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`,
                  }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              </View>

              {/* Types */}
              <View style={styles.modalTypes}>
                {selectedPokemon.types.map((t, index) => (
                  <View 
                    key={index} 
                    style={[styles.modalTypeBadge, { backgroundColor: getTypeColor(t.type.name) }]}
                  >
                    <Text style={styles.modalTypeText}>{t.type.name.toUpperCase()}</Text>
                  </View>
                ))}
              </View>

              {/* Basic Info */}
              <View style={styles.modalInfoRow}>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoLabel}>Height</Text>
                  <Text style={styles.modalInfoValue}>{formatHeight(selectedPokemon.height)} cm</Text>
                </View>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoLabel}>Weight</Text>
                  <Text style={styles.modalInfoValue}>{formatWeight(selectedPokemon.weight)} kg</Text>
                </View>
              </View>

              {/* Abilities */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Abilities</Text>
                <Text style={styles.modalSectionText}>{getAbilities(selectedPokemon)}</Text>
              </View>

              {/* All Stats */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Base Stats</Text>
                {stats.map((stat, index) => (
                  <View key={index} style={styles.modalStatRow}>
                    <Text style={styles.modalStatName}>{stat.name.toUpperCase()}</Text>
                    <View style={styles.modalStatBarContainer}>
                      <View 
                        style={[
                          styles.modalStatBar, 
                          { width: `${Math.min(stat.value, 100)}%`, backgroundColor: typeColor }
                        ]} 
                      />
                    </View>
                    <Text style={styles.modalStatValue}>{stat.value}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {liked.length} {liked.length === 1 ? 'Pokémon' : 'Pokémon'} collected!
        </Text>
      </View>
      
      {liked.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={liked}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.pokemonCard}
              onPress={() => handlePokemonPress(item)}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: item.sprites?.other?.["official-artwork"]?.front_default ||
                       `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
                }}
                style={styles.pokemonImage}
              />
              <Text style={styles.pokemonName}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
              <View style={styles.typeIndicator}>
                <View style={[styles.typeDot, { backgroundColor: getTypeColor(item.types[0]?.type.name) }]} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      
      {renderPokemonModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ff6b6b",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  listContainer: {
    padding: 10,
  },
  pokemonCard: {
    flex: 1/3,
    alignItems: "center",
    margin: 5,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonImage: {
    width: 80,
    height: 80,
  },
  pokemonName: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  typeIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  typeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: "85%",
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  modalBody: {
    padding: 20,
  },
  modalImageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
  },
  modalTypes: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  modalTypeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  modalTypeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalInfoRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    marginBottom: 15,
  },
  modalInfoItem: {
    alignItems: "center",
    flex: 1,
  },
  modalInfoLabel: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  modalInfoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 14,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  modalSectionText: {
    fontSize: 16,
    color: "#333",
    textTransform: "capitalize",
  },
  modalStatRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  modalStatName: {
    width: 70,
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  modalStatBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  modalStatBar: {
    height: "100%",
    borderRadius: 5,
  },
  modalStatValue: {
    width: 35,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  removeButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  removeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FavoritesScreen;

