import React from 'react'
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';


const styles = StyleSheet.create({
  answerInput: {
    // height: 0,

  },
  btn: {
    width: 200,
  },
  btnContainer: {
    marginTop: 10,
    alignItems: 'center'
  }
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
      <TextInput
        label="Prompt"
        value={prompt}
        multiline
        onChangeText={prompt => setPrompt(prompt)}
      />
      <TextInput
        style={styles.answerInput}
        label="Your Answer"
        multiline
        value={answer}
        onChangeText={answer => setAnswer(answer)}
      />
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
    </View>
  )
}

export default PromptEditor