import React from "react";
import { View, Button, StyleSheet } from "react-native";

interface Props {
  onLike: () => void;
  onDislike: () => void;
}

const ActionButtons: React.FC<Props> = ({ onLike, onDislike }) => {
  return (
    <View style={styles.container}>
      <Button title="Dislike" color="red" onPress={onDislike} />
      <Button title="Like" color="green" onPress={onLike} />
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
