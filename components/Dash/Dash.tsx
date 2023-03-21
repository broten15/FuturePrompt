import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Appbar, FAB, Card, Button, BottomNavigation } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import PBTimeLine from './PBTimeLine';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


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
  const layout = useWindowDimensions();

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


  const FirstRoute = () => (
    <View style={styles.container}>
      <PBTimeLine 
        navigation={navigation}
        promptBoards={promptBoards.filter((pb: any) => {
          const today = new Date();
          const receiveDate = new Date(pb.receiveDate);
          return receiveDate > today;
        })}
      />


    </View>
  );

  const SecondRoute = () => (
    <View style={styles.container}>
      <PBTimeLine 
        navigation={navigation}
        promptBoards={promptBoards.filter((pb: any) => {
          const today = new Date();
          const receiveDate = new Date(pb.receiveDate);
          return receiveDate <= today;
        })}
      />


    </View>
  );


  const renderScene = SceneMap({
    Pending: FirstRoute,
    Received: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      
      indicatorStyle={{ backgroundColor: '#755B00' }}
      // make text color black
      style={{ backgroundColor: 'white' }}
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
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('PBCreate', {
          promptBoards: promptBoards,
          setPromptBoards: setPromptBoards,
        })}
      />
    </>
  )
}


Dash.propTypes = {}

export default Dash