import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
  const {promptBoards, setPendingVisible, navigation} = props;

  const data = promptBoards.map((pb) => {
    // {time: '10:45', title: pb.name, description: ''},
    return {
      time: pb.receiveDate,
      title: pb.name,
      description: 'Create Date: ' + pb.createDate + '\nRecieve date: ' + pb.receiveDate,
      icon: <Image 
              style={{width: 25, height: 35}}
              source={require('../../assets/map-pin-icon.png')}
            />
    };
  });

  const handlePromptBoardPress = (event) => {
    // need to set pb to the PromptBoard object,
    // get that from event.target.value
    promptBoards.forEach((pb) => {
      if (pb.name === event.title) {
        const today = new Date();
        const receiveDate = new Date(pb.receiveDate);
        if (receiveDate <= today) {
          navigation.navigate('PBView', {
            promptBoard: pb,
          });
        } else {
          setPendingVisible(pb.name);
        }
      }
    });

  }

  return (
    <>
      <Timeline 
        data={data} 
        columnFormat='single-column-left'
        showTime={false}
        separator={true}
        circleColor='rgb(236, 225, 207)'
        circleSize={40}
        lineColor="rgb(105, 93, 63)"
        lineWidth={4}
        separatorStyle={{backgroundColor: "rgb(105, 93, 63)", height: 2}}
        onEventPress={(event) => handlePromptBoardPress(event)}
        innerCircle='icon' 
      />
    </>
  );
  }

  export default PBTimeLine;