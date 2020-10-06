import React, {useState, useContext, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {View, Text, StyleSheet, Button, TouchableOpacity, FlatList} from 'react-native';
import {CenterHome} from '../../Center';
import {AppContext} from '../../context/AppContext';

Icon.loadFont();

export const ListTasks = () => {
  const {getTasks, tasks, deleteTask} = useContext(AppContext);
  const [pressed, setPressed] = useState('');
  const [iconName, setIconName] = useState('checksquareo');
  const [arr, setArr] = useState([]);
  useEffect(() => {
    getTasks();
  }, [])

  const handlePress = (item) => {
    if(!pressed){
      setIconName('checksquare');
      setPressed(item);
    }else if(pressed){
      setIconName('checksquareo');
      setPressed('');
    }
  }

  return(
    <View style={{backgroundColor: '#c8c4fc', width: '80%', borderRadius: 10, padding: 25}}>
      <FlatList extraData={iconName} contentContainerStyle={styles.container} keyExtractor={tasks.id} data={tasks} renderItem={({item, index}) => (
          <TouchableOpacity style={styles.listItem}>
           <View style={styles.listItemView}>
              <Icon size={30} name={(pressed == item._id) ? iconName : 'checksquareo'}
                onPress={() => handlePress(item._id)} color="#c8c4fc" />
                <Text style={styles.listItemText}>{item.text}</Text>
              <Icon name="closesquareo" size={30} onPress={() => deleteTask(item._id)} color="#c8c4fc" />
           </View>
          </TouchableOpacity>
      )}/>
    </View>
 );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  listItem: {
    padding: 15,
    width: '100%',
    minWidth: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFDE7'
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '100%',
    minWidth: '100%'
  },
  listItemText: {
    fontSize: 20,
    color: '#fca567',
    fontFamily: 'Menlo',
    maxWidth: '80%',
    minWidth: '80%',
    textAlign: 'center',
  }
});
