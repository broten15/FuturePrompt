import React, { useState } from 'react'
import { AsyncStorage, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

const PendingModal = (props) => {
  const { promptBoards, setPromptBoards, pendingVisible, setPendingVisible } = props;

  const removePromptBoard = async () => {
    const newPromptBoards = promptBoards.filter(currPB => currPB.name !== pendingVisible);
    await AsyncStorage.setItem('@promptBoardsKey', JSON.stringify(newPromptBoards));
    setPromptBoards(newPromptBoards);

    // remove notification
    await Notifications.cancelScheduledNotificationAsync(pendingVisible);

    setPendingVisible(null);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={pendingVisible !== null} onDismiss={() => setPendingVisible(null)}>
          <Dialog.Title>
            Cannot open this prompt board yet! ⏰
          </Dialog.Title>
          <Dialog.Content>
            <Text>
{
`You can press the entries shown under the "Received" tab to view

Press "Delete" if you want to remove this prompt board`
}
            </Text>

          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              onPress={() => {
                removePromptBoard();
                setPendingVisible(null);
              }}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

export default PendingModal