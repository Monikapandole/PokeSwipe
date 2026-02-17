/**
 * PokeSwipe - A Pokémon Tinder-style App
 * 
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PokemonProvider } from './src/context/PokemonContext';
import RootNavigator from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PokemonProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <RootNavigator />
        </NavigationContainer>
      </PokemonProvider>
    </GestureHandlerRootView>
  );
}

export default App;
