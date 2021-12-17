import React, { useState } from 'react';
import { Image, View, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, 
Text } from 'react-native';
import { db, auth} from '../firebase';
import { useNavigation } from "@react-navigation/core";



const UserProfile = () => {

  const navigation = useNavigation()

   const [image, setImage] = useState(null);
   const [firstname, setFirstName] = useState('');
   const [lastname, setLastName] = useState('');
   const [addressOne, setAddressOne] = useState('');
   const [addressTwo, setAddressTwo] = useState('');
   const [mobileNumber, setMobile] = useState('');
 
   const updateProfile = () => {
    navigation.replace("Edit Profile")
}

const option = () => {
  navigation.replace("Options")
}


  var userId = auth.currentUser.uid;
  db.ref('/users/' + userId).once('value').then(function (snapshot) {
      setFirstName(snapshot.val().firstname);
      setLastName(snapshot.val().lastname);
      setAddressOne(snapshot.val().firstAddress);
      setAddressTwo(snapshot.val().secondAdress);
      setMobile(snapshot.val().mobilenumber);
      setImage(snapshot.val().imageUrl);
     console.log("Document data:", snapshot.val());
    });

    
    return (
        <ScrollView>
        <View style={styles.container} behavior="padding">
        <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
        <TouchableOpacity onPress={option}>
            <Text style={styles.buttonText}>Go Back To Options</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={updateProfile}>
            <Text style={styles.buttonText1}>Update Profile</Text>
          </TouchableOpacity>
          <Text>{"\n"}{"\n"}</Text>
      <View style={styles.inputContainer} >
         <Image style={styles.image} source={{ uri: image }}/>
        <TextInput
        style={styles.textInput}
        placeholder="First Name"
        numberOfLines={3}
        onChangeText={(value) => setFirstName(value) }
        value={firstname}
        style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray' }}
        />
        <TextInput
         style={styles.textInput}
         placeholder="Last Name"
         numberOfLines={3}
         onChangeText={(value) => setLastName(value) }
         value={lastname}
         style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray' }}
        />
         <TextInput
        style={styles.textInput}
        placeholder="Address 1"
        numberOfLines={3}
        onChangeText={(value) => setAddressOne(value) }
        value={addressOne}
        style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray' }}
        />
         <TextInput
        style={styles.textInput}
        placeholder="Address 2"
        numberOfLines={3}
        onChangeText={(value) => setAddressTwo(value) }
        value={addressTwo}
        style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray' }}
        />
         <TextInput
        style={styles.textInput}
        placeholder="Mobile Number"
        numberOfLines={3}
        onChangeText={(value) => setMobile(value) }
        value={mobileNumber}
        style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray' }}
        />
        </View>

         </View> 
         </ScrollView>
    );
}

export default UserProfile

const styles = StyleSheet.create({
    container:{
      flex: 4,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor: '#FFC0CB',
    },
    progressBarContainer: {
        marginTop: 20
      },
    inputContainer:{
    width:"80%"
    },
    buttonContainer:{
      width:"50%",
      alignItems:"center",
      marginTop: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20
     },

     button:{
      backgroundColor:"#0782F9",
      width:"100%",
      padding: 15,
      borderRadius: 10,
      alignItems:"center"
    },
      input:{
        backgroundColor:"white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
       },
       image: {
        width: 200,
        height: 200,
        marginLeft: 50
    },
    textInput: {
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 15,
      paddingVertical: 4,
      paddingHorizontal: 2,
      textAlignVertical: 'top',
  },
  buttonText:{
    color:"#800000",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 200,
    marginBottom: 5
   },
   buttonText1:{
    color:"#800000",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 245
   },
  });