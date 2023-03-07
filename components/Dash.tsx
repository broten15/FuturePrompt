import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Appbar, FAB, Card, Button, BottomNavigation } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';

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
  const [promptBoards, setPromptBoards] = useState([
    {
      name: 'Test Prompt Board',
      prompts: ['What is your favorite color?', 'What is your favorite food?'],
      answers: ['Blue', 'Pizza'],
      receiveDate: '2020-10-10',
      createDate: '2020-10-10',
    }
  ]);
  
  return (
    <View style={styles.container}>
      {promptBoards.map((pb) => (
        <View>
          <Text style={styles.entryName}>{pb.name}</Text>
          <Text>Created on {pb.createDate}</Text>
          <Text>Reveive on {pb.receiveDate}</Text>
        </View>
      ))}
      

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('PBCreate', {
          setPromptBoards: setPromptBoards,
        })}
      />


    </View>
  )
}


Dash.propTypes = {}

export default Dash