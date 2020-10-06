import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {CenterHome} from '../../Center';
import {AppContext} from '../../context/AppContext';

Icon.loadFont();

export const AddTask = () => {
  const {addTask} = useContext(AppContext);
  const [text, setText] = useState('');

  const handlePress = () => {
    if(!text){
      Alert.alert('Error', 'Make sure all fields are filled out!', {text: 'OK'})
    }else{
      const item = {text}
      addTask(item);
    }
    setText('');
  }

  return(
    <TouchableOpacity style={styles.container}>
      <Icon name="plus" style={{padding: 10}} size={25} color="#fca567" onPress={handlePress} />
      <TextInput style={styles.input} value={text} onChangeText={(words) => setText(words)} placeholder="Add a task" placeholderTextColor="#fca567"/>
    </TouchableOpacity>
 );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 45,
    borderColor: '#c8c4fc',
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white'
  },
  input: {
    padding: 5,
    fontSize: 25,
    textAlign: 'center',
    maxWidth: '90%',
    minWidth: '60%',
    fontFamily: 'Menlo',
    color: '#fca567',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#fca567'
  }
});
