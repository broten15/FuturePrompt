import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { 
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import yelowTheme from './yellowTheme.json';
import PBCreate from './components/PBCreate/PBCreate';
import Constants from 'expo-constants';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PromptEditor from './components/PBCreate/PromptEditor';
import { Text } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: yelowTheme,
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="PBCreate"
            options={{title: 'New Prompt Board'}}
            component={PBCreate}
          />
          <Stack.Screen
            name="PromptEditor"
            options={{title: 'Create Prompt'}}
            component={PromptEditor}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
