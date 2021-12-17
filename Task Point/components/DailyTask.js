import React, { useEffect, useState } from 'react';
import {StyleSheet, View, TextInput, Text, Button, TouchableOpacity, ScrollView} from 'react-native';
import { db, auth} from '../firebase';
import { useNavigation } from "@react-navigation/core";
import {MaterialCommunityIcons  } from '@expo/vector-icons';


const DailyTask = () => {

    var userId = auth.currentUser.uid;
      const taskRef = db.ref('/task/' + userId);
      const [task, setTask] = useState('')
      const [list, setList] = useState([])
      let [isUpdate, setIsUpdate] = useState(false);
      let [currentKey, setCurrentKey] = useState('')

      useEffect(()=>{
          fetchData()
      }, [])
    
      const navigation = useNavigation()

      const profileScreen = () => {
        navigation.replace("Options")
    }
    
      function addTask(){

        if(isUpdate){
          taskRef.child(currentKey).update({ task })
          fetchData()
          setTask('')

        }
       if(!isUpdate){
        taskRef.push({ task })
        fetchData()
        setTask('')
       }
          
      }

      function fetchData() {
        taskRef.on('value', function (snap) {
            let item = [];
            let x_ = snap.val();
            for(let y in x_){
                console.log(y);
                console.log(x_[y]);
                item.push({task: x_[y].task, key: y})
            }
            setList(item)
          }, )
      }

      function taskUpdate(key, task) {
          setCurrentKey(key)
          setIsUpdate(true)
          setTask(task)
      }

      function taskDelete(key) {
        taskRef.child(key).remove()
        fetchData()
      }

  return (
      <View style={styles.container}>
         <Text>{"\n"}</Text>
          <TouchableOpacity  onPress={profileScreen}>
          <Text style={styles.buttonText}>Go Back To Options</Text>
        </TouchableOpacity>
          <TextInput style={{borderBottomWidth: 0.34, marginBottom: 10}}
         value={task} 
         multiline={true}
         numberOfLines={5}
          onChangeText={(e) => { setTask(e)}}/>
          <Button title={isUpdate ? 'Update Task': 'Add Task' } color="#2F4F4F" onPress={addTask}/>
          <ScrollView>
             {list.map((item) => {
                 return(
                     <View style={{borderBottomWidth: 0.34, padding: 20, marginRight: 5, flexDirection: 'row'}}>
                      <Text style={{ flex: 8, fontSize: 16}}>{item.task}</Text>
                      <MaterialCommunityIcons.Button name="update" size={25} color='white' 
                     backgroundColor = '#2F4F4F' style={styles.button}
                     onPress={() => taskUpdate(item.key, item.task)} 
                     />
                    <Text style={{ flex: 0.20}}>{"\n"}</Text>
                    <MaterialCommunityIcons.Button name="delete" size={25} color='white' 
                     backgroundColor = '#2F4F4F' style={styles.button}
                     onPress={() => taskDelete(item.key)} 
                     />
                     </View>
                 )
             })}
        <View>
        
        </View>
          </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      padding: 5,
      backgroundColor: '#FFC0CB',
    },
    button:{
    marginLeft: 5,
    },
    buttonText:{
    color:"#800000",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 200,
    marginBottom: 5,
    },
  });

export default DailyTask