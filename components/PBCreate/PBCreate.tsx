import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: -650,
  },
});



const PBCreate = ({navigation}: any) => {
  return (
    <View>
      <Appbar>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="New Prompt Board" />
      </Appbar>
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('PromptEditor')}
      />
      
    </View>
  )
}


export default PBCreate