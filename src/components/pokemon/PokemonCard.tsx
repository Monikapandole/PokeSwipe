import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Pokemon, getTypeColor } from "../../types/pokemon";
import TypeBadge from "./TypeBadge";

interface Props {
  pokemon: Pokemon;
  onLike: () => void;
  onDislike: () => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, onLike, onDislike }) => {
  // Get the primary type for card background
  const primaryType = pokemon.types[0]?.type.name || "normal";
  const typeColor = getTypeColor(primaryType);
  
  // Format height (decimeters to cm)
  const heightInCm = pokemon.height * 10;
  
  // Format weight (hectograms to kg)
  const weightInKg = pokemon.weight / 10;
  
  // Get abilities (show up to 2)
  const abilities = pokemon.abilities
    .filter(a => !a.is_hidden)
    .slice(0, 2)
    .map(a => a.ability.name.replace(/-/g, " "))
    .join(", ") || "None";
  
  // Get some stats to display
  const hpStat = pokemon.stats.find(s => s.stat.name === "hp")?.base_stat || 0;
  const attackStat = pokemon.stats.find(s => s.stat.name === "attack")?.base_stat || 0;
  const defenseStat = pokemon.stats.find(s => s.stat.name === "defense")?.base_stat || 0;
  const speedStat = pokemon.stats.find(s => s.stat.name === "speed")?.base_stat || 0;

  return (
    <ScrollView 
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.card}>
        {/* Pokemon Number Badge */}
        <View style={[styles.numberBadge, { backgroundColor: typeColor }]}>
          <Text style={styles.numberText}>#{pokemon.id.toString().padStart(3, "0")}</Text>
        </View>
        
        {/* Pokemon Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: pokemon.sprites?.other?.["official-artwork"]?.front_default ||
                   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        {/* Pokemon Name */}
        <Text style={styles.name}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        
        {/* Pokemon Types */}
        <View style={styles.types}>
          {pokemon.types.map((t, index) => (
            <TypeBadge key={index} label={t.type.name} />
          ))}
        </View>
        
        {/* Info Row */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>{heightInCm} cm</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{weightInKg} kg</Text>
          </View>
        </View>
        
        {/* Abilities */}
        <View style={styles.abilitiesContainer}>
          <Text style={styles.abilitiesLabel}>Abilities</Text>
          <Text style={styles.abilitiesValue}>{abilities}</Text>
        </View>
        
        {/* Stats Preview */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>HP</Text>
            <View style={styles.statBarBg}>
              <View style={[styles.statBar, { width: `${Math.min(hpStat, 100)}%`, backgroundColor: "#4CAF50" }]} />
            </View>
            <Text style={styles.statValue}>{hpStat}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>ATK</Text>
            <View style={styles.statBarBg}>
              <View style={[styles.statBar, { width: `${Math.min(attackStat, 100)}%`, backgroundColor: "#F44336" }]} />
            </View>
            <Text style={styles.statValue}>{attackStat}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>DEF</Text>
            <View style={styles.statBarBg}>
              <View style={[styles.statBar, { width: `${Math.min(defenseStat, 100)}%`, backgroundColor: "#2196F3" }]} />
            </View>
            <Text style={styles.statValue}>{defenseStat}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>SPD</Text>
            <View style={styles.statBarBg}>
              <View style={[styles.statBar, { width: `${Math.min(speedStat, 100)}%`, backgroundColor: "#FF9800" }]} />
            </View>
            <Text style={styles.statValue}>{speedStat}</Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <View style={[styles.actionBtn, styles.dislikeBtn]}>
            <Text style={styles.dislikeBtnText} onPress={onDislike}>✕</Text>
          </View>
          <View style={[styles.actionBtn, styles.likeBtn]}>
            <Text style={styles.likeBtnText} onPress={onLike}>♥</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    margin: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  numberBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  numberText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  imageContainer: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginTop: 8,
  },
  types: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    marginHorizontal: 8,
  },
  infoItem: {
    alignItems: "center",
    flex: 1,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: "#ddd",
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  abilitiesContainer: {
    marginTop: 16,
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  abilitiesLabel: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  abilitiesValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 10,
    color: "#888",
    fontWeight: "bold",
    marginBottom: 4,
  },
  statBarBg: {
    width: "80%",
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  statBar: {
    height: "100%",
    borderRadius: 3,
  },
  statValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 20,
    gap: 20,
  },
  actionBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  dislikeBtn: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ff4757",
  },
  likeBtn: {
    backgroundColor: "#ff4757",
  },
  dislikeBtnText: {
    fontSize: 24,
    color: "#ff4757",
    fontWeight: "bold",
  },
  likeBtnText: {
    fontSize: 28,
    color: "#fff",
  },
});
