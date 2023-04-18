import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, RadioButton } from 'react-native-paper';

const styles = StyleSheet.create({

  // make this view scrollable and cap the height at 4 items in the list of presets
  presetList: {
    // maxHeight: 200,
    overflow: 'scroll',
  },

});


const CreateModal = forwardRef((props, ref) => {
  const { promptBoards, setPromptBoards, navigation } = props;

  const [createPBvisible, setCreatePBVisible] = useState(false);
  const [value, setValue] = useState("Create without preset");

  const changeValue = () => {
    setCreatePBVisible(!createPBvisible);
  };
  useImperativeHandle(ref, () => ({
    setCreatePBVisible: () => changeValue()
  }));


  const presets = ["Create without preset", "Cat Checkup", "College", "Yearly Checkup", "Fun Questions"];


  return (
    <View>
      <Portal>
        <Dialog visible={createPBvisible} onDismiss={() => setCreatePBVisible(false)}>
          <Dialog.Title>Choose a prompt preset</Dialog.Title>
          <ScrollView>
            <Dialog.Content style={styles.presetList}>
              <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                {presets.map((preset, index) => (
                  <RadioButton.Item key={`${preset}${index}`} label={preset} value={preset} />
                ))}
              </RadioButton.Group>
            </Dialog.Content>
          </ScrollView>
          <Dialog.Actions>
            <Button 
              onPress={() => {
                navigation.navigate('PBCreate', {
                  preset: value,
                  promptBoards: promptBoards,
                  setPromptBoards: setPromptBoards,
                });
                setCreatePBVisible(false);
              }}
            >
              Create
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
});

export default CreateModal