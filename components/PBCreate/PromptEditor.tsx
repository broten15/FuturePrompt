import React from 'react'
import { View, StyleSheet } from 'react-native';
import { TextInput as RPTextInput, Text, Button } from 'react-native-paper';
import { TextInput } from 'react-native';


const styles = StyleSheet.create({
  promptInput: {
    marginTop: 10,
    padding: 10,
    fontSize: 25,
  },
  answerInput: {
    padding: 10,
    fontSize: 15,
  },
  btn: {
    width: 200,
  },
  btnContainer: {
    marginTop: 10,
    alignItems: 'center'
  },
  textInput: {

  },
});

const PromptEditor = ({route, navigation}: any) => {
  const {prompts, setPrompts, answers, setAnswers} = route.params;


  const [prompt, setPrompt] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  const addPromptResponse = () => {
    const updatedPrompts = prompts.map(prompt => prompt);
    updatedPrompts.push(prompt);
    setPrompts(updatedPrompts);    
    const updatedAnswers = answers.map(answer => answer);
    updatedAnswers.push(answer);
    setAnswers(updatedAnswers);
    navigation.navigate('PBCreate');
  }
    
  return (
    <View >
      <View
        style={styles.btnContainer}
      >
        <Button 
          mode="contained" 
          style={styles.btn}
          onPress={() => addPromptResponse()}
        >
          Add
        </Button>
      </View>
      <TextInput
        multiline
        onChangeText={prompt => setPrompt(prompt)}
        defaultValue={"Write a prompt"}
        style={styles.promptInput}
        clearTextOnFocus={true}
      /> 
      <TextInput
        multiline
        onChangeText={answer => setAnswer(answer)}
        defaultValue={"Write your response"}
        style={styles.answerInput}
        clearTextOnFocus={true}
      /> 
    </View>
  )
}

export default PromptEditor