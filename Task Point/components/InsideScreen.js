import React from 'react';
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View } from "react-native";
import {  auth } from '../firebase';
import {AntDesign, MaterialIcons  } from '@expo/vector-icons';


const InsideScreen = () => {

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
   
    
    return (
        <View style={styles.container}> 
        <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
        <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
        <Text style={styles.text}>Welcome, {auth.currentUser?.email}</Text>
        <Text>{'\n'}{'\n'}</Text>
        <AntDesign.Button name="profile" size={50} color='black' 
          backgroundColor = '#EBECF0' style={styles.button}
           onPress={profileScreen} 
          />
           <Text>{'\n'}</Text>
           <MaterialIcons.Button name="add-task" size={50} color='black' 
          backgroundColor = '#EBECF0' style={styles.button}
           onPress={TaskScreen} 
          />
          <Text>{'\n'}</Text>
           <MaterialIcons.Button name="feedback" size={50} color='black' 
          backgroundColor = '#EBECF0' style={styles.button}
           onPress={feedBack} 
          />
          <Text>{'\n'}</Text>
           <AntDesign.Button name="logout" size={50} color='black' 
          backgroundColor = '#EBECF0' style={styles.button}
           onPress={handleSignOut} 
          />
        </View>
    )
}

export default InsideScreen

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems:'center',
      justifyContent:"center",
      marginTop: -500,
      backgroundColor: '#FFC0CB',
      flexDirection: 'column'
    },
    text:{
     fontSize: 20,
     fontWeight: 'bold',
     textTransform: 'uppercase',
    },
  
    buttonText:{
     color:"white",
     fontWeight: "700",
     fontSize: 14
    },
    button:{
    marginLeft: 5,
    }
  });