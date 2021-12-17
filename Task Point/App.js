//To run this app, install-
// expo install expo-image-picker
//expo install expo-sms
//expo install expo-mail-composer
//expo install expo-font
//npm install @react-navigation/native @react-navigation/native-stack
//expo install react-native-screens react-native-safe-area-context
//npm install @react-navigation/core

import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import InsideScreen from './components/InsideScreen';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import DailyTask from './components/DailyTask';
import MainFeedBackScreen from './components/MainFeedBackScreen';
import FeedBackEmail from './components/FeedBackEmail';
import FeedBackSms from './components/FeedBackSms';
import { useFonts } from 'expo-font';

function HomeScreen({navigation}){

  const [loaded] = useFonts({
    Malizia: require('./assets/fonts/Malizia.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return(
    <View style={styles.container}>
      <Text style={styles.maintitle}>Task Point</Text>
      <Image style={styles.image} source={require('./assets/task.png')}/>
       <Text style={styles.title}>Hello Our Honoured Customer!{"\n"}</Text>
      <Text style={styles.text}>Sign in to your Task Point account now!{"\n"}</Text>
      <View style={styles.buttonContainer}>
      <Button title="SIGN IN" color="black"
      onPress={() => navigation.navigate("Sign In")}/>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
    </View>
  )
}


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRoutename=" ">
      <Stack.Screen name=" " component={HomeScreen}/>
      <Stack.Screen options={{headerShown:false}} name="Sign In" component={SignIn}/>
      <Stack.Screen  name="Sign Up" component={Signup}/>
      <Stack.Screen options={{headerShown:false}} name="Options" component={InsideScreen}/>
      <Stack.Screen options={{headerShown:false}} name="Options" name="User Profile" 
      component={UserProfile}/>
      <Stack.Screen options={{headerShown:false}} name="Options" name="Edit Profile" 
      component={EditProfile}/>
      <Stack.Screen options={{headerShown:false}} name="Options"  name="Task List" 
      component={DailyTask}/>
      <Stack.Screen options={{headerShown:false}} name="Options" name="Feedback" 
      component={MainFeedBackScreen} />
      <Stack.Screen options={{headerShown:false}} name="Options" name="Send SMS" 
      component={FeedBackSms} />
      <Stack.Screen options={{headerShown:false}} name="Options" name="Email"
       component={FeedBackEmail} />

    </Stack.Navigator>
      
    
      </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC0CB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  maintitle: {
    fontFamily: 'Malizia',
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
    fontWeight: '200'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  buttonContainer: {
    margin: 15,
    width: "80%",
    elevation: 8,
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 40,

  },

  buttonText:{
    color:"blue",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 25
   },

  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginLeft: 20,
    marginRight: 20
}
});
