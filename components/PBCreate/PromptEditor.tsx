import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { TextInput as RPTextInput, Text, Button as RPButton, Appbar } from 'react-native-paper';
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
  const {selectedIndex, prompts, setPrompts, answers, setAnswers} = route.params;
  const navigation = useNavigation();

  const [prompt, setPrompt] = useState(selectedIndex !== -1 ? prompts[selectedIndex]: "");
  const [answer, setAnswer] = useState(selectedIndex !== -1 ? answers[selectedIndex]: "");

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {selectedIndex !== -1 && 
            <Appbar.Action 
              icon={'delete'} 
              onPress={() => {
                const updatedPrompts = prompts.filter((uPrompt, index) => index !== selectedIndex);
                const updatedAnswers = answers.filter((uAnswer, index) => index !== selectedIndex);
                setPrompts(updatedPrompts);
                setAnswers(updatedAnswers);
                navigation.goBack();
              }} 
            />
          }
          <RPButton 
            mode="contained" 
            onPress={() => addPromptResponse()}
          >
            Add
          </RPButton>
        </>
      ),
    });
  }, [prompt, answer]); // TODO: Why do i need these dependencies?

  const addPromptResponse = () => {
    const updatedPrompts = prompts.map((uPrompt, index) => {
      if (index === selectedIndex) {
        return prompt;
      }
      return uPrompt;
    });
    
    const updatedAnswers = answers.map((uAnswer, index) => {
      if (index === selectedIndex) {
        return answer;
      }
      return uAnswer;
    });
    if (selectedIndex === -1) {
      updatedPrompts.push(prompt);
      updatedAnswers.push(answer);
    }
    setPrompts(updatedPrompts);    
    setAnswers(updatedAnswers);
    navigation.goBack();
  }


    
  return (
    <View style={styles.container}>
      <View
        style={styles.btnContainer}
      >
        {/* <RPButton 
          mode="contained" 
          style={styles.btn}
          onPress={() => addPromptResponse()}
        >
          Add
        </RPButton> */}
      </View>
      <TextInput
        multiline
        onChangeText={prompt => setPrompt(prompt)}
        placeholder="Write a prompt"
        value={prompt}
        style={styles.promptInput}
      /> 
      <TextInput
        multiline
        onChangeText={answer => setAnswer(answer)}
        placeholder="Write your response"
        style={styles.answerInput}
        clearTextOnFocus={true}
      /> 
    </View>
  )
}

export default PromptEditor