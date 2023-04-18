import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, TextInput, Touchable, TouchableHighlight, ScrollView, Dimensions, Image } from 'react-native';
import { Text, Appbar, FAB, Card, Button, BottomNavigation } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import PBTimeLine from './PBTimeLine';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Modal, Portal, Provider } from 'react-native-paper';

import { Dialog, RadioButton } from 'react-native-paper';

import * as Notifications from 'expo-notifications';
import { bgColor } from '../constants';
import PendingModal from './PendingModal';
import CreateModal from './CreateModal';
import Filler from './Filler';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    backgroundColor: bgColor,
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

  // make this view scrollable and cap the height at 4 items in the list of presets
  presetList: {
    // maxHeight: 200,
    overflow: 'scroll',
  },

  
});




const Dash = ({navigation}: any) => {
  const layout = useWindowDimensions();

  const ref = useRef();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Pending', title: 'Pending' },
    { key: 'Received', title: 'Received' },
  ]);

  const [promptBoards, setPromptBoards] = useState([]);
  
  useEffect(() => {
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


  const BaseRoute = (props) => {
    const {filteredBoards} = props;

    return (
      <View style={styles.container}>
        {filteredBoards.length <= 0 && 
          <Filler />
        }
        <PBTimeLine 
          navigation={navigation}
          setPromptBoards={setPromptBoards}
          allPromptBoards={promptBoards}
          promptBoards={filteredBoards}
        />
      </View>
    )
  }
  
  const FirstRoute = () => {
    const filteredBoards = promptBoards.filter((pb: any) => {
      const today = new Date();
      const receiveDate = new Date(pb.receiveDate);
      return receiveDate > today;
    })

    return (
      <BaseRoute filteredBoards={filteredBoards} />
    )
  };
  
  const SecondRoute = () => {
    const filteredBoards = promptBoards.filter((pb: any) => {
      const today = new Date();
      const receiveDate = new Date(pb.receiveDate);
      return receiveDate <= today;
    })

    return (
      <BaseRoute filteredBoards={filteredBoards} />
    )
  };


  const renderScene = SceneMap({
    Pending: FirstRoute,
    Received: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      
      indicatorStyle={{ backgroundColor: '#755B00' }}
      // make text color black
      style={{ backgroundColor: bgColor }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: 'black', margin: 8 }}>
          {route.title}
        </Text>
      )}
    />
  );


  
  return (
    <>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />

      <CreateModal 
        promptBoards={promptBoards}
        setPromptBoards={setPromptBoards}
        navigation={navigation}
        ref={ref}
      />

      <FAB
        icon="pencil-box"
        label="Create Board"
        style={styles.fab}
        onPress={() => {
          ref.current.setCreatePBVisible();
        }}
      />
    </>
  )
}


Dash.propTypes = {}

export default Dash