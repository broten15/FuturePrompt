import React from 'react'
import { View, StyleSheet } from 'react-native';
import { TextInput as RPTextInput, Text, Button } from 'react-native-paper';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  promptInput: {
    fontSize: 25,
  },
  answerInput: {
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

const PromptEditor = ({route}: any) => {
  const {prompts, setPrompts, answers, setAnswers} = route.params;
  const navigation = useNavigation();

  const [prompt, setPrompt] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  const addPromptResponse = () => {
    const updatedPrompts = prompts.map(prompt => prompt);
    updatedPrompts.push(prompt);
    setPrompts(updatedPrompts);    
    const updatedAnswers = answers.map(answer => answer);
    updatedAnswers.push(answer);
    setAnswers(updatedAnswers);
    navigation.goBack();
  }
    
  return (
    <View style={styles.container}>
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