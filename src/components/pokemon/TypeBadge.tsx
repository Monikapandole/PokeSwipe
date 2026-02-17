import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { getTypeColor } from "../../types/pokemon";

interface Props {
  label: string;
}

const TypeBadge: React.FC<Props> = ({ label }) => {
  const backgroundColor = getTypeColor(label);
  
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.badgeText}>{label.toUpperCase()}</Text>
    </View>
  );
};

export default TypeBadge;

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
