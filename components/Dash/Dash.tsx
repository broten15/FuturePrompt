import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Appbar, FAB, Card, Button, BottomNavigation } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import PBTimeLine from './PBTimeLine';
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 20,
  },
  PBEntry: {
    margin: 10,
  },
  entryName: {
    fontSize: 20,
  },


  // TODO: refactor this
  btn: {
    width: 200,
  },
  btnContainer: {
    marginBottom: 10,
    alignItems: 'center'
  },
});


 
const Dash = ({navigation}: any) => {
  const [promptBoards, setPromptBoards] = useState([]);
  
  useEffect(() => {
    console.log('use2')
    const getPromptBoards = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@promptBoardsKey')
        if (jsonValue != null) {
          setPromptBoards(JSON.parse(jsonValue));
        }
      } catch(e) {
        console.error("COULD not get promptBoards");
        // error reading value
      }
    }
    getPromptBoards();
  }, [])

  
  return (
    <View style={styles.container}>
      <PBTimeLine 
        navigation={navigation}
        promptBoards={promptBoards}
      />
      

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('PBCreate', {
          promptBoards: promptBoards,
          setPromptBoards: setPromptBoards,
        })}
      />


    </View>
  )
}


Dash.propTypes = {}

export default Dash