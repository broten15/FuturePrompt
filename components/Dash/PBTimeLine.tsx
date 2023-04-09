import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Timeline from 'react-native-timeline-flatlist'

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
  const {promptBoards, navigation} = props;

  const data = promptBoards.map((pb)=> {
    {time: {pb.receiveDate}, title: {pb.name}, description: {pb.description}}},
    {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
    {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
    {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
    {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
  }
  return (
    <><Timeline
      data={data} />
      <View>
        {promptBoards.map((pb, index) => (
          <TouchableOpacity
            key={pb.name + index}
            onPress={() => {
              const today = new Date();
              const receiveDate = new Date(pb.receiveDate);
              if (receiveDate <= today) {
                navigation.navigate('PBView', {
                  promptBoard: pb,
                });
              }
            } }
          >
            <View
              style={styles.PBEntry}

            >
              <Text style={styles.entryName}>{pb.name}</Text>
              <Text>Created on {pb.createDate}</Text>
              <Text>Reveive on {pb.receiveDate}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View></>
  );
  }

  export default PBTimeLine;