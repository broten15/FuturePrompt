import React from 'react'
import { View } from 'react-native'
import { Appbar, Button } from 'react-native-paper';


const MyAppBar = (props: any) => {
  const {navigation, back, options} = props;


  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.title} />
      
      <Button
        mode="contained" 
      >
        Submit
      </Button>
    </Appbar.Header>
  );
}

export default MyAppBar