import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import { auth } from '../firebase';
import { useFonts } from 'expo-font';


const Signup = () => {

  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');

  const handleSignUp = () => {
    if (registrationEmail.length < 4) {
      Alert.alert('Please enter an email address.');
      return;
    }

    if (registrationPassword.length < 4) {
      Alert.alert('Please enter a password.');
      return;
    }

    auth.createUserWithEmailAndPassword(registrationEmail, registrationPassword)
      .then(function (_firebaseUser) {
        Alert.alert('You have been registered successfully! Go Back to Sign In');

        setRegistrationEmail('');
        setRegistrationPassword('');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          Alert.alert('The password is too weak.');
        }
        else {
          Alert.alert(errorMessage);
        }
        console.log(error);
      }
      );
  }
  const [loaded] = useFonts({
    Malizia: require('../assets/fonts/Malizia.ttf'),
  });

  if (!loaded) {
    return null;
  }

  
  return (
    <View
      style={styles.container}
      behavior="padding">
      <Text style={styles.maintitle}>Task Point</Text>
         <Image style={styles.image} source={require('../assets/register.png')}/>
      <View style={styles.inputContainer} >
        <TextInput
        placeholder="Email"
        value={ registrationEmail }
        onChangeText={value => setRegistrationEmail(value)}
         style={styles.input}
        />
         <TextInput
        placeholder="Password"
        value={ registrationPassword }
        onChangeText={value => setRegistrationPassword(value)}
         style={styles.input}
         secureTextEntry
        />
      </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={handleSignUp}>
            <Text style={styles.buttonOutlineText}>SIGN UP</Text>
          </TouchableOpacity>

        </View>
    </View>
  )
}

export default Signup;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: '#FFC0CB'
  },
  inputContainer:{
   width:"80%"
  },
  input:{
   backgroundColor:"white",
   paddingHorizontal: 15,
   paddingVertical: 10,
   borderRadius: 10,
   marginTop: 5
  },
  buttonContainer:{
   width:"60%",
   justifyContent:"center",
   alignItems:"center",
   marginTop: 40
  },
  button:{
    width:"100%",
    padding: 15,
    borderRadius: 10,
    alignItems:"center"
  },
  buttonOutline:{
   backgroundColor:"#40E0D0",
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
maintitle: {
  fontFamily: 'Malizia',
  fontSize: 50,
  color: 'black',
  textAlign: 'center',
  fontWeight: '200'
}
});