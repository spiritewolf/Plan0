import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppContext} from '../../context/AppContext';
import {AddTask} from './AddTask';
import {ListTasks} from './ListTasks';
import {CenterHome} from '../../Center';

const Stack = createStackNavigator();

export const TaskMain = () => {
  return(
    <CenterHome>
      <Text style={styles.text}>Task Manager</Text>
      <AddTask />
      <ListTasks />
    </CenterHome>
 );
}

 export const Tasks = () => {
   return (
     <Stack.Navigator screenOptions={{header: () => null}}>
       <Stack.Screen name="TaskMain" component={TaskMain}/>
     </Stack.Navigator>
   )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20,
    color: '#fca567',
    fontFamily: 'Menlo',
    textAlign: 'center',
  }
});
