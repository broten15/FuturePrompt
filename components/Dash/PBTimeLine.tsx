import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import { bgColor } from '../constants';
import PendingModal from './PendingModal';

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
  const {promptBoards, setPromptBoards, navigation, allPromptBoards} = props;

  const ref = useRef();

  const data = promptBoards.map((pb) => {
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
    
    allPromptBoards.forEach((pb) => {
      if (pb.name === event.title) {
        const today = new Date();
        const receiveDate = new Date(pb.receiveDate);
        if (receiveDate <= today) {
          console.log("first", props)
          navigation.navigate('PBView', {
            promptBoard: pb,
            promptBoards: allPromptBoards,
            setPromptBoards: setPromptBoards,
          });
        } else {
          // setPendingVisible(pb.name);
          ref.current.setPendingVisible(event.title);
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
        circleColor={bgColor}
        circleSize={40}
        lineColor="rgb(105, 93, 63)"
        lineWidth={4}
        separatorStyle={{backgroundColor: "rgb(105, 93, 63)", height: 2}}
        onEventPress={(event) => handlePromptBoardPress(event)}
        innerCircle='icon' 
      />

      <PendingModal
        ref={ref}
        promptBoards={allPromptBoards}
        setPromptBoards={setPromptBoards}
      />
    </>
  );
  }

  export default PBTimeLine;