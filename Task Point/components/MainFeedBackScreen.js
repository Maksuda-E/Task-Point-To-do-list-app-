import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useFonts } from 'expo-font';

const MainFeedBackScreen = () => {

    const navigation = useNavigation()

    const smsScreen = () => {
        navigation.replace("Send SMS")
    }

    const emailScreen = () => {
        navigation.replace("Email")
    }

    const profileScreen = () => {
        navigation.replace("Options")
    }

    const [loaded] = useFonts({
        Bushetch: require('../assets/fonts/Bushetch.ttf'),
      });
    
      if (!loaded) {
        return null;
      }

    return(
        <View style={styles.container}> 
        <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
        <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
        <Text style={styles.maintitle}>We Valued Your Feedback</Text>
        <Image style={styles.image} source={require('../assets/feedback.png')}/>
        <TouchableOpacity style={styles.button} onPress={smsScreen}>
        <Text style={styles.buttonText}>Give Feedback Through SMS</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>OR</Text>
        <TouchableOpacity style={styles.button} onPress={emailScreen}>
        <Text style={styles.buttonText}>Give Feedback Through Email</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={profileScreen}>
          <Text style={styles.buttonText1}>Go Back To Options</Text>
        </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems:'center',
      justifyContent:"center",
      marginTop: -500,
      backgroundColor: '#FFC0CB',
    },
    text:{
     fontSize: 16,
     fontWeight: 'bold',
     textTransform: 'uppercase',
    },
  
    buttonText:{
     color:"white",
     fontWeight: "700",
     fontSize: 18
    },
    buttonText1:{
    color:"#800000",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    textAlign:'center'
    },
    button:{
    backgroundColor:"#B22222",
    width:"70%",
    padding: 10,
    borderRadius: 5,
    alignItems:"center",
    marginTop: 20,
    borderWidth: 5
    },
    image: {
    width: 250,
    height: 250,
    marginLeft: 20,
    marginRight: 20
    },
    maintitle: {
    fontFamily: 'Bushetch',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    fontWeight: '200'
      },
  });
   
export default MainFeedBackScreen