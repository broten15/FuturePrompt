import React from 'react'
import { View } from 'react-native'
import { Appbar, Button } from 'react-native-paper';
import { bgColor } from './constants';


const MyAppBar = (props: any) => {
  const {navigation, back, options} = props;


  return (
    <Appbar.Header style={{backgroundColor: bgColor}}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.title} />
    </Appbar.Header>
  );
}

export default MyAppBar