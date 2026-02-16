import React from "react";
import { Text, StyleSheet } from "react-native";

interface Props {
  label: string;
}

const TypeBadge: React.FC<Props> = ({ label }) => {
  return <Text style={styles.badge}>{label}</Text>;
};

export default TypeBadge;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 4,
  },
});
