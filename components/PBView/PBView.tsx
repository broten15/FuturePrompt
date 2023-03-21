import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text, Appbar, FAB, Card, Button } from 'react-native-paper';

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
  const prompts = props.route.params.promptBoard.prompts;
  const answers = props.route.params.promptBoard.answers;
  const name = props.route.params.promptBoard.name;

  return (
    <View style={styles.container}>
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
            <Text variant="titleLarge">asdasd</Text>
            <Text variant="bodyMedium">{answers[index]}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

export default PBView;