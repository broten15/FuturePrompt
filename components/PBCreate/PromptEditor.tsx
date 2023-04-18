import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { TextInput as RPTextInput, Text, Button as RPButton, Appbar } from 'react-native-paper';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { bgColor } from '../constants';
import * as ImagePicker from 'expo-image-picker';


const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop : 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: bgColor,
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
    marginBottom: 10,
  },
  picturesContainer: {
    alignItems: 'center',
  }
});


function ImageViewer({ selectedImage }) {
  // get the screen width and height
  const screenWidth = Dimensions.get('window').width;
  console.log(selectedImage)
  const imageHeight = selectedImage.height;
  const imageWidth = selectedImage.width;
  // get the ratio of height and width
  // user width to get the new height
  const ratio = imageHeight / imageWidth;
  const adjustedHeight = screenWidth * ratio;
  

  return <Image source={{uri: selectedImage.uri}} style={{width: screenWidth - 10, height: adjustedHeight, resizeMode: 'contain'}} />;
}

const PromptEditor = ({route}: any) => {
  const {
    selectedIndex, prompts, setPrompts, 
    answers, setAnswers, imageAssets, setImageAssets
  } = route.params;
  const navigation = useNavigation();
  console.log(answers[selectedIndex])

  const [prompt, setPrompt] = useState(selectedIndex !== -1 ? prompts[selectedIndex]: "");
  const [answer, setAnswer] = useState(selectedIndex !== -1 ? answers[selectedIndex]: "");
  const [imageAsset, setImageAsset] = useState(selectedIndex !== -1 ? imageAssets[selectedIndex]: null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Appbar.Action 
            icon={'paperclip'} 
            onPress={() => {
              const pickImageAsync = async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  allowsEditing: true,
                  quality: 1,
                });
                if (!result.canceled) {
                  setImageAsset(result.assets[0]);
                } else {
                  alert('You did not select any image.');
                }
              };
              pickImageAsync();
            }} 
          />
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
  }, [prompt, answer, imageAsset]); // TODO: Why do i need these dependencies?

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
    console.log('imageasset', imageAsset)
    const updatedImageAssets = imageAssets.map((uImageAsset, index) => {
      if (index === selectedIndex) {
        return imageAsset;
      }
      return uImageAsset;
    });
    if (selectedIndex === -1) {
      updatedPrompts.push(prompt);
      updatedAnswers.push(answer);
      updatedImageAssets.push(imageAsset);
    }
    setPrompts(updatedPrompts);    
    setAnswers(updatedAnswers);
    setImageAssets(updatedImageAssets);
    console.log("before goback", updatedImageAssets)
    navigation.goBack();
  }


    
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textInput}>
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
          placeholder="Write your response (press clip to add an image)"
          style={styles.answerInput}
          value={answer}
          clearTextOnFocus={true}
        /> 
      </View>

      <View style={styles.picturesContainer}>
        {imageAsset !== null && <ImageViewer selectedImage={imageAsset}/>}
      </View>
        
    </ScrollView>
  )
}

export default PromptEditor