import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, View } from 'react-native';
import { 
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import yelowTheme from './yellowTheme.json';
import PBCreate from './components/PBCreate/PBCreate';
import Constants from 'expo-constants';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PromptEditor from './components/PBCreate/PromptEditor';
import { Text } from 'react-native-paper';
import Dash from './components/Dash/Dash';
import MyAppBar from './components/MyAppBar';
import 'intl';
import 'intl/locale-data/jsonp/en';
import PBView from './components/PBView/PBView';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: yelowTheme,
};
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}


export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dash"
          // screenOptions={{
          //   header: (props) => <MyAppBar {...props} />,
          // }}
        >
          <Stack.Screen
            name="Dash"
            options={{title: 'Prompt Boards'}}
            component={Dash}
          />
          <Stack.Screen
            name="PBCreate"
            options={{title: 'New Prompt Board'}}
            component={PBCreate}
          />
          <Stack.Screen
            name="PromptEditor"
            options={{title: 'Create Prompt'}}
            component={PromptEditor}
          />
          <Stack.Screen
            name="PBView"
            options={{title: 'View Prompt Board'}}
            component={PBView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
