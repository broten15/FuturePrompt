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
  // PromptBoard = {
  //   name: string,
  //   prompts: lists of strings,
  //   answers: lists of strings (same size as prommpts: prompts[i] -> answers[i]),
  //   receiveDate: javascript date object: date.toDateString(),
  //   createDate: javascript date object: (new Date()).toDateString(),
  // }

  // prompts boards is a list of PromptBoard
  const {promptBoards, navigation} = props;

  const data = promptBoards.map((pb) => {
    // {time: '10:45', title: pb.name, description: ''},
    return {time: pb.receiveDate, title: pb.name, description: 'Create Date: ' + pb.createDate + '\nRecieve date: ' + pb.receiveDate};
  });

  const handlePromptBoardPress = (event) => {
    // need to set pb to the PromptBoard object,
    // get that from event.target.value
    console.log(event.target.value); // see what it is
    const pb = ;// set this
    const today = new Date();
    const receiveDate = new Date(pb.receiveDate);
    if (receiveDate <= today) {
      navigation.navigate('PBView', {
        promptBoard: pb,
      });
    }
  }

  return (
    <>
      <Timeline 
      data={data} 
      columnFormat='single-column-left'
      showTime={false}
      separator={true}
      circleColor="rgb(105, 93, 63)"
      circleSize={20}
      lineColor="rgb(105, 93, 63)"
      lineWidth={6}
      separatorStyle={{backgroundColor: "rgb(105, 93, 63)", height: 2}}
      onEventPress={(event) => handlePromptBoardPress(event)}
      />
        {/* <View>
          {promptBoards.map((pb, index) => (
            <TouchableOpacity
              key={pb.name + index}
              onPress={handlePromptBoardPress}
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
        </View> */}
      </>
  );
  }

  export default PBTimeLine;