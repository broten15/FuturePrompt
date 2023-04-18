import React from 'react'
import { View, Image, StyleSheet} from 'react-native'
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  fillerContainer: {
    alignItems: 'center',
  }

});


const Filler = () => {
  return (
    <View style={styles.fillerContainer}>
      <Image 
        source={require('../../assets/sticky-notes.png')}
      />
      <Text style={{textAlign: 'center'}} variant="headlineLarge">Nothing here yet!</Text>
      <Text style={{textAlign: 'center'}} variant="titleLarge">Press "Create Board" to get started. Create and answer your prompts, then select a date for them to be sent back.</Text>
    </View>
  )
}

export default Filler