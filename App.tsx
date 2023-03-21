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
import Dash from './components/Dash/Dash';
import MyAppBar from './components/MyAppBar';
import 'intl';
import 'intl/locale-data/jsonp/en';
import PBView from './components/PBView/PBView';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: yelowTheme,
};
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dash"
          // screenOptions={{
          //   header: (props) => <MyAppBar {...props} />,
          // }}
        >
          <Stack.Screen
            name="Dash"
            options={{title: 'Prompt Boards'}}
            component={Dash}
          />
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
          <Stack.Screen
            name="PBView"
            options={{title: 'View Prompt Board'}}
            component={PBView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
