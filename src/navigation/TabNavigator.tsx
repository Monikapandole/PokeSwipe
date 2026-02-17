import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SwipeScreen from "../screens/Swipe";
import FavoritesScreen from "../screens/Favorites";

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused }: { focused: boolean }) => {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Text style={styles.icon}>🔥</Text>
    </View>
  );
};

const FavoritesIcon = ({ focused }: { focused: boolean }) => {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Text style={styles.icon}>❤️</Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ff6b6b",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={SwipeScreen}
        options={{
          tabBarLabel: "Swipe",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ focused }) => <FavoritesIcon focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: 85,
    paddingBottom: 20,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  iconContainerFocused: {
    backgroundColor: "rgba(255, 107, 107, 0.15)",
  },
  icon: {
    fontSize: 24,
  },
});

export default TabNavigator;
