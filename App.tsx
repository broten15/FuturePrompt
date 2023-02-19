import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { 
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import PBCreate from './components/PBCreate/PBCreate';
import Constants from 'expo-constants';
import * as React from 'react';

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    "primary": "rgb(117, 91, 0)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(255, 224, 142)",
    "onPrimaryContainer": "rgb(36, 26, 0)",
    "secondary": "rgb(105, 93, 63)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(242, 225, 187)",
    "onSecondaryContainer": "rgb(35, 27, 4)",
    "tertiary": "rgb(71, 102, 74)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(201, 236, 200)",
    "onTertiaryContainer": "rgb(4, 33, 11)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(30, 27, 22)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(30, 27, 22)",
    "surfaceVariant": "rgb(236, 225, 207)",
    "onSurfaceVariant": "rgb(76, 70, 57)",
    "outline": "rgb(126, 118, 103)",
    "outlineVariant": "rgb(207, 197, 180)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(51, 48, 42)",
    "inverseOnSurface": "rgb(247, 240, 231)",
    "inversePrimary": "rgb(237, 193, 62)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(248, 243, 242)",
      "level2": "rgb(244, 238, 235)",
      "level3": "rgb(240, 233, 227)",
      "level4": "rgb(238, 232, 224)",
      "level5": "rgb(236, 229, 219)"
    },
    "surfaceDisabled": "rgba(30, 27, 22, 0.12)",
    "onSurfaceDisabled": "rgba(30, 27, 22, 0.38)",
    "backdrop": "rgba(53, 48, 36, 0.4)"
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    // flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <PBCreate />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}
