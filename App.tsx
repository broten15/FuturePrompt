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

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: yelowTheme,
};

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    // flex: 1,
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="PBCreate"
            options={{title: 'Prompt Board Creator'}}
            component={PBCreate}
          />
          <Stack.Screen
            name="PromptEditor"
            options={{title: 'Create Prompt and Response'}}
            component={PromptEditor}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
