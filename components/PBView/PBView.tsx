import React, { useEffect } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Text, Appbar, FAB, Card, Button } from 'react-native-paper';
import { bgColor } from '../constants';

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
  card: {
    marginTop: 10,
  },
  PBName: {
    fontSize: 30,
  },
  cardContent: {

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


const PBView = (props: any) => {
  const navigation = props.navigation;
  const prompts = props.route.params.promptBoard.prompts;
  const answers = props.route.params.promptBoard.answers;
  const name = props.route.params.promptBoard.name;
  const promptBoards = props.route.params.promptBoards;
  const setPromptBoards = props.route.params.setPromptBoards;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <> 
          <Appbar.Action 
            icon={'delete'} 
            onPress={() => {
              const newPromptBoards = promptBoards.filter((currPB: any) => currPB.name !== name);
              AsyncStorage.setItem('@promptBoardsKey', JSON.stringify(newPromptBoards));
              setPromptBoards(newPromptBoards);

              navigation.goBack();
            }} 
          />
        </>
      ),
    });
  }, []); // TODO: Why do i need these dependencies?

  return (
    <View style={styles.container}>
      <Text>Created on {props.route.params.promptBoard.createDate}</Text>
      <Text
        style={styles.PBName}
      >
        {name}
      </Text>
      {prompts.map((prompt, index) => (
        <Card 
          style={styles.card}
          mode='contained'
          key={`prompt${index}`}
        >
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge">{prompt}</Text>
            <Text variant="bodyMedium">{answers[index]}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

export default PBView;