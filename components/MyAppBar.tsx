import React from 'react'
import { View } from 'react-native'
import { Appbar } from 'react-native-paper';


const MyAppBar = (props: any) => {

    
  return (
    <Appbar.Header>
      <Appbar.Content title="My awesome app" />
    </Appbar.Header>
  );
}

export default MyAppBar