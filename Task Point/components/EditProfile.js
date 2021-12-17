import React, { useEffect, useState } from 'react';
import { Image, View, TextInput, TouchableOpacity, Button, Alert, StyleSheet, 
  ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {db, auth, storage} from '../firebase';
import { useNavigation } from "@react-navigation/core";



const EditProfile = () => {

  const navigation = useNavigation()

   const [image, setImage] = useState(null);
   const [firstname, setFirstName] = useState('');
   const [lastname, setLastName] = useState('');
   const [addressOne, setAddressOne] = useState('');
   const [addressTwo, setAddressTwo] = useState('');
   const [mobileNumber, setMobile] = useState('');
  const [saveButton, setSaveButton] = useState(false);

 const userProfile = () => {
    navigation.replace("User Profile")
}

   useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, need camera permissions to make this work!');
        }
      }
    })();
  }, []);
  
   const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const ChooseImage = () => {
    Alert.alert('Choose option', 'Which way do you want to choose photo?', [
        { text: "Choose From Gallery", onPress: (pickImage) },
        { text: "Take new photo", onPress: (takeImage) },
        ],
        { cancelable: true });
}

function editData(){
  storage.ref(image.split("/").pop()).put(setImage).then(() => {
    console.log(`${image} has been succussfully uploaded`);
  })
  .catch((e) => console.log('uploading image error => ', e));
 
  var userId = auth.currentUser.uid;
  db.ref('users/' + userId).set(
      {
          firstname: firstname,
          lastname: lastname,
          firstAddress: addressOne,
          secondAdress: addressTwo,
          mobilenumber: mobileNumber,
          imageUrl : image,
      })
      .then(function () {
        Alert.alert('Profile Information has been updated!');
      })
      .catch(function (error) {
        Alert.alert('Error occured');
        console.log('Error occured: ', error);
      });
    
}
    const Reset = () => {
        setImage(null);
        setFirstName(null);
        setLastName(null);
        setAddressOne(null);
        setAddressTwo(null);
        setMobile(null);
        setSaveButton(false);
      }
    return (
        <ScrollView>
        <Text>{"\n"}</Text>
      <View style={styles.container}>
      <View style={styles.inputContainer} >
      <TouchableOpacity onPress={ChooseImage}>
        {! image &&
             <Image style={styles.image} source={require('../assets/profile.png')} /> 
        }
        { image &&
            <Image style={styles.image} source={{ uri: image }}/>
        }
        </TouchableOpacity>
        <Text>{"\n"}</Text>
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
        {!saveButton &&
         <View style={styles.buttonContainer}>
         <Button style={styles.button} title="Update" color="#2F4F4F" onPress={editData} />
         <Button style={styles.button} title="Back to profile" color="#800000" onPress={userProfile} />
       </View>
       
        }
         {saveButton &&
         <View style={styles.buttonContainer}>
         <Button style={styles.button} title="Reset" onPress={Reset} />
       </View>
        }

         </View> 
         </ScrollView>
    );
}

export default EditProfile

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems:"center",
      justifyContent:"center",
    },
    progressBarContainer: {
        marginTop: 20
      },
    inputContainer:{
    width:"80%",
    },
    buttonContainer:{
        width:"60%",
        alignItems:"center",
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
       },

       button:{
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
        width: 150,
        height: 150,
        marginLeft: 100
    },
    textInput: {
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 15,
      paddingVertical: 4,
      paddingHorizontal: 2,
      textAlignVertical: 'top'
  }
  });