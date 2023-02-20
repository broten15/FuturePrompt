import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Text, Appbar, FAB, Card } from 'react-native-paper';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    height: '100%'
    // marginTop: Constants.statusBarHeight,
    // flex: 1,
    // justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 20,
  },
  card: {
    margin: 5,
  }
});

const PBCreate = ({navigation}: any) => {
  const [prompts, setPrompts] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);

  return (
    <View style={styles.container}>
      <View>
        {/* <Appbar>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="New Prompt Board" />
        </Appbar> */}

        {prompts.map((prompt, index) => (
          <Card 
            style={styles.card}
            mode='contained'
            key={`prompt${index}`}
          >
            <Card.Content>
              <Text variant="titleLarge">{prompt}</Text>
              <Text variant="bodyMedium">{answers[index]}</Text>
            </Card.Content>
          </Card>
        ))}

      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('PromptEditor', {
          prompts: prompts,
          setPrompts: setPrompts, 
          answers: answers,
          setAnswers: setAnswers,
        })}
      />
    </View>
  )
}


export default PBCreate