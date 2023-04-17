import React from 'react'
import { View } from 'react-native'
import { Appbar, Button } from 'react-native-paper';


const MyAppBar = (props: any) => {
  const {navigation, back, options} = props;


  return (
    <Appbar.Header style={{backgroundColor: 'rgb(236, 225, 207)'}}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.title} />
    </Appbar.Header>
  );
}

export default MyAppBar