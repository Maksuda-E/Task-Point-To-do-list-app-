import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/core";
import * as MailComposer from 'expo-mail-composer';

const FeedBackEmail = () => {

    const navigation = useNavigation()

    const feedBack = () => {
        navigation.replace("Feedback")
    }

   [message, setMessage] = useState();

    onChangeHandler = (value) => {
        setMessage(value);
    }

sendMessageWithEmail = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
        if (isAvailable){
         var options = {
            recipients:['elahimaksuda@gmail.com'],
            subject: 'Subject Line',
            body: message
          };
          MailComposer.composeAsync(options).then((result) => {console.log( result.status );
            Alert.alert('SUCCESS', 'Your Email has been sent!', [
              { text: "Okay", 
              onPress: () => console.log("Okay Pressed") }
              ],
              { cancelable: false }); 
            })
          
        } else {
            Alert.alert("Email is not avaiable");
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
        <Button title="Send Email" color="#123456" onPress={sendMessageWithEmail}/>
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
    buttonContainer: {
    margin: 15,
    width: "100%",
    elevation: 8,
    backgroundColor: "#123456",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 2,
  },

  buttonText1:{
    color:"#800000",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    textAlign:'center'
    }
      
  });
  

  export default FeedBackEmail;