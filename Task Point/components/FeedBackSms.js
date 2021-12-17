import React, {useState} from 'react';
import {TextInput, Alert, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import * as SMS from 'expo-sms';
import { useNavigation } from "@react-navigation/core";

const FeedBackSms = () => {
    const navigation = useNavigation()
    const feedBack = () => {
        navigation.replace("Feedback")
    }

    [message, setMessage] = useState();

    onChangeHandler = (value) => {
        setMessage(value);
    }

    sendMessageWithSMS = async () => {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable){
          const {result} = await SMS.sendSMSAsync(
            '555-555-5555',
             message
          );
          console.log(result);
           Alert.alert('SMS sent!', 'Your SMS has been sent successfully', [
          { text: "Okay", 
          onPress: () => console.log("Okay Pressed") }
          ],
          { cancelable: false });
        } else {
            Alert.alert("SMS is not avaiable");
        }
   } 
    return(
      <View style={styles.form}>
         <Text>{"\n"}{"\n"}</Text>
        <Text style={styles.label}>Write Your Feedback Here..</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={10}
            onChangeText={onChangeHandler}
            />
       <View style={styles.buttonContainer}>
        <Button title="Send SMS" color="#123456" onPress={sendMessageWithSMS}/>
        </View>
        <TouchableOpacity  onPress={feedBack}>
          <Text style={styles.buttonText1}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    form:{
      margin: 30,
      marginTop: 20

  },
    text: {
      fontSize: 14,
      textAlign: 'center',
    },

    details: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonContainer: {
        margin: 15,
        width: "80%",
        elevation: 8,
        backgroundColor: "#123456",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginLeft: 40,
    
      },
      buttonText1:{
        color:"#800000",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 10,
        textAlign:'center'
        },
       button:{
       backgroundColor:"#0782F9",
       width:"30%",
       padding: 10,
       borderRadius: 5,
       alignItems:"center",
       marginTop: 20
       },
       label:{
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'left'
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 5,
        textAlignVertical: 'top',
        fontSize: 16,
    },
  });
  
  export default FeedBackSms;