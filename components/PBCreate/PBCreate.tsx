import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Appbar, FAB, Card, Button } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { en, registerTranslation } from 'react-native-paper-dates'

registerTranslation('en', en)

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

const PBCreate = ({route, navigation}: any) => {
  const {promptBoards, setPromptBoards} = route.params;

  const [PBName, setPBName] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [date, setDate] = useState(undefined);


  const addProptBoard = () => {
    const newPromptBoard = {
      name: PBName,
      prompts: prompts,
      answers: answers,
      receiveDate: date.toDateString(),
      createDate: (new Date()).toDateString(),
    }
    const newPromptBoards = promptBoards.map(p => p);
    newPromptBoards.push(newPromptBoard);
    setPromptBoards(newPromptBoards);
    navigation.navigate('Dash');
  }

  return (
    <View style={styles.container}>
      <View>
        {/* <Appbar>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="New Prompt Board" />
        </Appbar> */}


        <View
          style={styles.btnContainer}
        >
          <Button 
            mode="contained" 
            style={styles.btn}
            onPress={() => addProptBoard()}
          >
            Submit
          </Button>
        </View>

        <DatePickerInput
          locale="en"
          label="Return Date"
          value={date}
          onChange={(d) => setDate(d)}
          inputMode="start"
        />

        <TextInput
          multiline
          onChangeText={p => setPBName(p)}
          defaultValue={"Write a Prompt Board Name"}
          style={styles.PBName}
          // clearTextOnFocus={true}
        /> 

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