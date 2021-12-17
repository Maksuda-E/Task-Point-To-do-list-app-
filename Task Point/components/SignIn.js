import { useNavigation } from "@react-navigation/core";
import React, {useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import { auth } from '../firebase';
import { useFonts } from 'expo-font';
import {AntDesign, MaterialIcons  } from '@expo/vector-icons';

const SignIn = () => {

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

 const handleLogin = () => {
  if (loginEmail.length < 4) {
    Alert.alert('Please enter an email address.');
    return;
  }

  if (loginPassword.length < 4) {
    Alert.alert('Please enter a password.');
    return;
  }

  auth.signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(function (_firebaseUser) {
      Alert.alert('Successfully logged in!');
      setLoggedIn(true);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        Alert.alert('Wrong password.');
      }
      else {
        Alert.alert(errorMessage);
      }
    }
    );
}

const navigation = useNavigation()

const handleSignOut = () => {
    auth.signOut()
    .then(() => {
        navigation.replace(" ")
    })
    .catch(error => alert(error.message))
}

const profileScreen = () => {
    navigation.replace("User Profile")
}

const TaskScreen = () => {
    navigation.replace("Task List")
}

const feedBack = () => {
    navigation.replace("Feedback")
}

  const [loaded] = useFonts({
    Malizia: require('../assets/fonts/Malizia.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    
    <View style={styles.container}>
    {!loggedIn &&
    <View style={styles.container1}>
         <Text style={styles.maintitle}>Task Point</Text>
         <Image style={styles.image} source={require('../assets/signin.png')}/>
      <View style={styles.inputContainer} >
        <TextInput
         placeholder="Email"
        value={ loginEmail }
        onChangeText={value => setLoginEmail(value)}
         style={styles.input}
        />
         <TextInput
         placeholder="Password"
        value={loginPassword }
        onChangeText={value => setLoginPassword(value)}
         style={styles.input}
         secureTextEntry
        />
      </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
 </View>}
 {loggedIn &&
 <View style={styles.container2}>
   <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
   <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
      <Text style={styles.text}>Welcome, {auth.currentUser?.email}</Text>
      <Text>{'\n'}</Text>
      <AntDesign.Button name="profile" size={50} color='black' 
        backgroundColor = '#EBECF0' style={styles.button1}
         onPress={profileScreen} 
        />
         <Text>{'\n'}</Text>
         <MaterialIcons.Button name="add-task" size={50} color='black' 
        backgroundColor = '#EBECF0' style={styles.button1}
         onPress={TaskScreen} 
        />
        <Text>{'\n'}</Text>
         <MaterialIcons.Button name="feedback" size={50} color='black' 
        backgroundColor = '#EBECF0' style={styles.button1}
         onPress={feedBack} 
        />
        <Text>{'\n'}</Text>
         <AntDesign.Button name="logout" size={50} color='black' 
        backgroundColor = '#EBECF0' style={styles.button1}
         onPress={handleSignOut} 
        />
       </View>}
        </View>
  )
}

export default SignIn;

const styles = StyleSheet.create({

  container:{
    flex: 0.98,
    alignItems:"center",
    backgroundColor: '#FFC0CB',
  },
  container1:{
    flex: 0.98,
    alignItems:"center",
    justifyContent:"center",
  },
  container2:{
    flex: 1,
    alignItems:'center',
    justifyContent:"center",
    marginTop: -500,
    flexDirection: 'column'
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
   },
  maintitle: {
    fontFamily: 'Malizia',
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
    fontWeight: '200'
  },
  inputContainer:{
   width:"80%"
  },
  input:{
   backgroundColor:"white",
   paddingHorizontal: 15,
   paddingVertical: 10,
   borderRadius: 10,
   marginTop: 5,
   width: 300
  },
  buttonContainer:{
   marginTop: 20,
  },
  button:{
    backgroundColor:"#0047AB",
    width:"100%",
    padding: 10,
    borderRadius: 10,
    alignItems:"center"
  },
  button1:{
    marginLeft: 5,
    },
  buttonOutline:{
   backgroundColor:"white",
   marginTop: 5,
   borderColor: "black",
   borderWidth: 2
  },
  buttonText:{
   color:"white",
   fontWeight: "700",
   fontSize: 16
  },
  buttonOutlineText:{
   color:"black",
   fontWeight: "700",
   fontSize: 16
  },
  image: {
    width: 250,
    height: 250,
    marginLeft: 30,
    marginRight: 20
},
});