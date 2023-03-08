import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

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

const PBTimeLine = (props) => {
  const {promptBoards} = props;

  return (
    <View>
      {promptBoards.map((pb) => (
        <View style={styles.PBEntry}>
          <Text style={styles.entryName}>{pb.name}</Text>
          <Text>Created on {pb.createDate}</Text>
          <Text>Reveive on {pb.receiveDate}</Text>
        </View>
      ))}
    </View>
  );
}

export default PBTimeLine;