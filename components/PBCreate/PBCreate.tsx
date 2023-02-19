import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  appbar: {

  },
  PBCreateContainer: {

  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: -700,
  },
});

const PBCreate = () => {
  return (
    <View
      style={styles.PBCreateContainer}
    >
      <Appbar
        style={styles.appbar}
      >
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="New Prompt Board" />
      </Appbar>
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
      
    </View>
  )
}


export default PBCreate