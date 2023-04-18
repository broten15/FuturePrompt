import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Appbar, FAB, Card, Button as RPButton } from 'react-native-paper';
import { DatePickerInput, DatePickerModal } from 'react-native-paper-dates';
import { en, registerTranslation } from 'react-native-paper-dates'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Notifications from 'expo-notifications';

import yellowTheme from '../../yellowTheme.json';
import { bgColor } from '../constants';

registerTranslation('en', en)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    paddingBottom: 0,
    marginBottom: 100,
    backgroundColor: bgColor,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 5,
    backgroundColor: yellowTheme.secondaryContainer,
    color: 'white',
  },
  card: {
    marginTop: 10,

  },
  PBName: {
    fontSize: 25,
    marginTop: 10,
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

  scrollContainer: {
    marginBottom: "25%",
  }
});

const presets = {
  "Create without preset": [],
  "College": [
    "What goals do you have for your first semester? First year? What do you hope to accomplish by the time you graduate?",
    "What do you look forward to the most? What are you the most worried about?",
    "What's one thing you want yourself to remember by the time you graduate?",
    "What do you want from your college experience? What do you plan on doing to achieve that?",
    "Describe how you felt on your first day on campus",
    "What was a notable experience on your first day of class? ",
    "Give one piece of advice for yourself once you're a college grad",
  ],
  "Yearly Checkup": [
    "What goals did you achieve last year? What goals are you setting for next year? ",
    "Are you happy/content with what you're doing at the moment? Is there anything you hope to change by next year? ",
    "How is your health? What can you do to improve it this upcoming year? ",
    "What are a few things you wish to do more of this upcoming year? ",
    "Are you still pursuing your dreams?",
    "Who are people you wish to spend more time with this upcoming year? ",
    "What challenges are you currently facing and how do you plan on overcoming them?",
    "Describe your favorite memory from this past year. ",
    "Who haven't you told “thank you” to enough this year?", 
  ],
  "Fun Questions": [
    "What's your favorite song at the moment? Favorite movie? ",
    "What's your current guilty pleasure? ",
    "What are you grateful for? ",
    "What's a popular trend that you can't stand?",
    "Write down your next billion-dollar idea now so that if it's ever created, you have proof that you thought of it first. ",
    "Go through a current day-in-the-life of yourself",
    "If you become famous in the next year, what do you think it will be for?",
  ]
}


const PBCreate = ({route, navigation}: any) => {
  const {preset, promptBoards, setPromptBoards} = route.params;

  const [PBName, setPBName] = useState(preset);
  const [prompts, setPrompts] = useState(presets[preset]);
  const [imageAssets, setImageAssets] = useState(presets[preset].map(() => null));
  const [answers, setAnswers] = useState(presets[preset].map(() => ""));
  const [date, setDate] = useState(undefined);
  const [dateModelOpen, setDateModelOpen] = useState(false);

  

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RPButton 
          mode="contained" 
          onPress={() => addProptBoard()}
        >
          Submit
        </RPButton>
      ),
    });
  }, [PBName, prompts, answers, date]);

  async function schedulePushNotification(PBName: string) {
    const currDate = new Date();
    let trigger: Date;
    if (!date) {
      trigger = currDate;
    } else {
      trigger = date;
    }
    trigger.setHours(currDate.getHours());
    trigger.setMinutes(currDate.getMinutes());
    trigger.setSeconds(currDate.getSeconds() + 1);
    
    await Notifications.scheduleNotificationAsync({
      identifier: PBName,
      content: {
        title: `${PBName} is now viewable! 📬`,
        body: 'Open FuturePrompt to view your prompt board!',
      },
      trigger: {date: trigger},
    });
  }

  const addProptBoard = async () => {
    const newPromptBoard = {
      name: PBName,
      prompts: prompts,
      answers: answers,
      receiveDate: date.toDateString(),
      createDate: (new Date()).toDateString(),
    }
    const newPromptBoards = promptBoards.map(p => p);
    newPromptBoards.push(newPromptBoard);

    await AsyncStorage.setItem('@promptBoardsKey', JSON.stringify(newPromptBoards));
    setPromptBoards(newPromptBoards);

    await schedulePushNotification(PBName);

    navigation.navigate('Dash');
  }

  const handleDateInput = (d: string) => {
    console.log(d)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scrollContainer}>

          <DatePickerInput
            locale="en"
            label="Return Date"
            value={date}
            onPressIn={() => setDateModelOpen(true)}
            onChange={(d) => setDate(d)}
            inputMode="start"
          />
          <DatePickerModal
            locale="en"
            mode="single"
            visible={dateModelOpen}
            onDismiss={() => {setDateModelOpen(false)}}
            date={date}
            onConfirm={(d) => {
              setDate(d.date);
              setDateModelOpen(false);
            }}
          />

          <TextInput
            multiline
            onChangeText={p => setPBName(p)}
            style={styles.PBName}
            clearTextOnFocus={true}
            placeholder="(Write a Prompt Board Name)"
          /> 

          {prompts.map((prompt, index) => (
            <TouchableOpacity 
              key={`prompt${index}`} 
              onPress={() => navigation.navigate('PromptEditor', {
                selectedIndex: index,
                prompts: prompts,
                setPrompts: setPrompts, 
                answers: answers,
                setAnswers: setAnswers,
                imageAssets: imageAssets,
                setImageAssets: setImageAssets,
              })}
            >
              <Card 
                style={styles.card}
                mode='contained'
              >
                <Card.Content style={styles.cardContent}>
                  <Text variant="titleMedium">{prompt}</Text>


                  {answers[index] === "" && imageAssets[index] === null ? 
                    <Text 
                      variant="bodyMedium"
                    >
                      (Press to edit)
                    </Text>
                  : 
                    <Text 
                      variant="bodyMedium"
                    >
                      {answers[index]}
                    </Text>
                  }
                  
                  {imageAssets[index] !== null && 
                    <Image 
                      source={{uri: imageAssets[index].uri}} 
                      style={{height:100, width:100}}
                    />
                  }
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
        {console.log("here2",imageAssets)}
      <FAB
        icon="plus"
        label="Add Prompt"
        style={styles.fab}
        onPress={() => navigation.navigate('PromptEditor', {
          imageAssets: imageAssets,
          setImageAssets: setImageAssets,
          selectedIndex: -1,
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